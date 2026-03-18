---
name: stock-watch
description: Real-time-ish U.S. stock watchlist monitoring using verified web data, with current price, intraday range, percent move, volume context, simple trend labeling, and alert-condition checks. Use when the user wants concrete up-to-date stock monitoring, watchlist snapshots, trigger alerts, or structured trading-assistant style analysis for specific tickers.
---

# Stock Watch

Use this skill when the task is about monitoring a small list of U.S. stocks with concrete market data rather than vague commentary.

## What this skill is for
- Get the latest available quote snapshot for one or more U.S. tickers
- Compute intraday position, range, percent move, and simple volume context
- Label short-term state such as:
  - short-term strong / weak
  - near day high / near day low
  - possible breakout continuation
  - possible fade / intraday reversal
  - chase risk / pullback watch / possible rebound stabilization
- Check alert conditions against user-defined thresholds

## Data-source rule
- Prefer the bundled script in `scripts/watchlist.py`
- The script currently uses Yahoo chart endpoints (`/v8/finance/chart`) because they work in this environment without extra credentials
- Treat this as *near-real-time retail-grade* data, not institutional tick-level guaranteed market data
- If the script fails or data looks stale, say so explicitly

## Output rule
When giving a stock-monitoring answer, prefer this structure:
1. Ticker + latest price context
2. Day move and intraday position
3. Simple trend label
4. Trigger status (if thresholds were provided)
5. Trading-assistant interpretation
6. Clear uncertainty note when data quality is limited

## Commands

### Single snapshot
```bash
python3 "{baseDir}/scripts/watchlist.py" quote NVDA SNDK LITE MU NBIS NOK
```

### JSON output
```bash
python3 "{baseDir}/scripts/watchlist.py" quote NVDA MU --json
```

### Alert check
```bash
python3 "{baseDir}/scripts/watchlist.py" alert NVDA --above 950
python3 "{baseDir}/scripts/watchlist.py" alert SNDK --below 120
```

## Practical guidance
- Do not present precise buy/sell orders as certainty
- Use the data to support statements like:
  - “strong but extended”
  - “weak and near day low”
  - “watch for reclaim”
  - “better to wait for pullback”
- For earnings names, always mention event risk
- For high-beta AI names, combine price state + catalyst + risk of chasing
- Read `references/watchlist-defaults.md` when you need the default AI watchlist and interpretation heuristics.
- Prefer the script output over memory or intuition when discussing current tape.

## Limitations
- This is not a full broker feed
- Premarket / after-hours availability depends on endpoint coverage
- Volume is useful for context but not perfect as a full tape substitute
- Use this skill as a concrete decision-support layer, not as a fake certainty engine
 Use this skill as a concrete decision-support layer, not as a fake certainty engine
