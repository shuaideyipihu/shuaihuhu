#!/usr/bin/env python3
import argparse
import json
from urllib.request import Request, urlopen

BASE = "https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1m&range=1d&includePrePost=true"
UA = "Mozilla/5.0 (OpenClaw stock-watch)"
DEFAULT_WATCHLIST = ["NVDA", "MU", "SNDK", "LITE", "NBIS", "NOK", "CRCL"]


def fetch_json(url: str):
    req = Request(url, headers={"User-Agent": UA})
    with urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))


def safe_num(x):
    try:
        if x is None:
            return None
        return float(x)
    except Exception:
        return None


def pct_change(price, prev):
    if price is None or prev in (None, 0):
        return None
    return (price - prev) / prev * 100.0


def intraday_position(price, low, high):
    if None in (price, low, high) or high == low:
        return None
    return (price - low) / (high - low)


def classify(meta: dict):
    price = safe_num(meta.get("regularMarketPrice"))
    prev = safe_num(meta.get("chartPreviousClose"))
    high = safe_num(meta.get("regularMarketDayHigh"))
    low = safe_num(meta.get("regularMarketDayLow"))
    open_ = safe_num(meta.get("regularMarketOpen"))
    volume = safe_num(meta.get("regularMarketVolume"))
    pct = pct_change(price, prev)
    intraday_pos = intraday_position(price, low, high)

    labels = []
    if pct is not None:
        if pct >= 5:
            labels.append("very-strong-up")
        elif pct >= 3:
            labels.append("strong-up")
        elif pct > 0:
            labels.append("up")
        elif pct <= -5:
            labels.append("very-strong-down")
        elif pct <= -3:
            labels.append("strong-down")
        elif pct < 0:
            labels.append("down")
        else:
            labels.append("flat")

    if intraday_pos is not None:
        if intraday_pos >= 0.85:
            labels.append("near-day-high")
        elif intraday_pos <= 0.15:
            labels.append("near-day-low")
        else:
            labels.append("mid-range")

    bias = "neutral"
    if pct is not None and intraday_pos is not None:
        if pct > 1 and intraday_pos > 0.7:
            bias = "short-term-strong"
        elif pct < -1 and intraday_pos < 0.3:
            bias = "short-term-weak"
        elif pct > 0 and intraday_pos < 0.45:
            bias = "up-but-fading"
        elif pct < 0 and intraday_pos > 0.55:
            bias = "down-but-rebounding"

    risk = []
    if pct is not None and pct >= 6:
        risk.append("extended-upside")
    if pct is not None and pct <= -6:
        risk.append("panic-risk")
    if bias == "up-but-fading":
        risk.append("chase-risk")
    if bias == "short-term-weak":
        risk.append("avoid-blind-bottom-fishing")

    action = "observe"
    if bias == "short-term-strong" and "near-day-high" in labels:
        action = "strong-but-do-not-blindly-chase"
    elif bias == "short-term-strong":
        action = "watch-for-pullback-entry"
    elif bias == "up-but-fading":
        action = "do-not-chase-strength"
    elif bias == "down-but-rebounding":
        action = "rebound-watch-only"
    elif bias == "short-term-weak":
        action = "avoid-for-now"

    return {
        "price": price,
        "prevClose": prev,
        "pct": pct,
        "open": open_,
        "high": high,
        "low": low,
        "volume": volume,
        "intradayPos": intraday_pos,
        "labels": labels,
        "bias": bias,
        "riskFlags": risk,
        "assistantAction": action,
    }


def get_quote(symbol: str):
    data = fetch_json(BASE.format(symbol=symbol))
    result = data.get("chart", {}).get("result")
    if not result:
        raise ValueError(f"No chart result for {symbol}")
    meta = result[0].get("meta", {})
    stats = classify(meta)
    return {
        "symbol": symbol.upper(),
        "currency": meta.get("currency"),
        "exchange": meta.get("fullExchangeName") or meta.get("exchangeName"),
        "marketState": meta.get("marketState"),
        "regularMarketTime": meta.get("regularMarketTime"),
        **stats,
    }


def fmt(x, digits=2):
    if x is None:
        return "n/a"
    return f"{x:.{digits}f}"


def render_quote(row):
    return (
        f"{row['symbol']}: ${fmt(row['price'])} | {fmt(row['pct'])}% | "
        f"day {fmt(row['low'])}-{fmt(row['high'])} | bias={row['bias']} | "
        f"action={row['assistantAction']} | labels={','.join(row['labels'])}"
    )


def render_watchlist(rows):
    lines = []
    for row in rows:
        if "error" in row:
            lines.append(f"{row['symbol']}: ERROR {row['error']}")
            continue
        lines.append(render_quote(row))
    return "\n".join(lines)


def run_quote(args):
    out = []
    for s in args.symbols:
        try:
            out.append(get_quote(s))
        except Exception as e:
            out.append({"symbol": s.upper(), "error": str(e)})
    if args.json:
        print(json.dumps(out, ensure_ascii=False, indent=2))
    else:
        for row in out:
            if "error" in row:
                print(f"{row['symbol']}: ERROR {row['error']}")
            else:
                print(render_quote(row))


def run_watchlist(args):
    symbols = args.symbols if args.symbols else DEFAULT_WATCHLIST
    out = []
    for s in symbols:
        try:
            out.append(get_quote(s))
        except Exception as e:
            out.append({"symbol": s.upper(), "error": str(e)})
    if args.json:
        print(json.dumps(out, ensure_ascii=False, indent=2))
    else:
        print(render_watchlist(out))


def run_alert(args):
    row = get_quote(args.symbol)
    price = row["price"]
    hit = False
    reasons = []
    if args.above is not None and price is not None and price >= args.above:
        hit = True
        reasons.append(f"price >= {args.above}")
    if args.below is not None and price is not None and price <= args.below:
        hit = True
        reasons.append(f"price <= {args.below}")
    payload = {
        "symbol": row["symbol"],
        "price": price,
        "hit": hit,
        "reasons": reasons,
        "bias": row["bias"],
        "labels": row["labels"],
        "riskFlags": row["riskFlags"],
        "assistantAction": row["assistantAction"],
    }
    if args.json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print(json.dumps(payload, ensure_ascii=False))


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)

    q = sub.add_parser("quote")
    q.add_argument("symbols", nargs="+")
    q.add_argument("--json", action="store_true")
    q.set_defaults(func=run_quote)

    w = sub.add_parser("watchlist")
    w.add_argument("symbols", nargs="*")
    w.add_argument("--json", action="store_true")
    w.set_defaults(func=run_watchlist)

    a = sub.add_parser("alert")
    a.add_argument("symbol")
    a.add_argument("--above", type=float)
    a.add_argument("--below", type=float)
    a.add_argument("--json", action="store_true")
    a.set_defaults(func=run_alert)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
