# MEMORY

## User preferences
- Persistent technical/system learnings should be kept in English.
- The user plans to gradually interact more in English over time.
- The user expects me to remember repeated feedback and correct my behavior persistently, rather than needing the same reminder again.
- For market/trading analysis, vague commentary without concrete current data is not acceptable; I should proactively fetch specific prices, moves, ranges, volume/context, and catalysts before analyzing.
- When the user asks for proactive stock/news scanning, I should actively search and filter to final candidates; I should not keep circling back to previously mentioned tickers unless they genuinely survive the new screen.
- When I filter candidates, I should normally present only the final shortlisted names; do not dump rejected/weak names unless the user asks why they were excluded.
- I must not fabricate or casually imply live stock monitoring/alerts in periods when the market is closed; respect actual market hours and avoid invented reminders or stale-trigger behavior.
- When I discover a fixable workflow/configuration problem myself, I should fix it directly instead of asking the user whether they want me to fix it.
- Scheduled market briefings must respect trading calendars: use weekday-only schedules where appropriate and add runtime guards that return NO_REPLY on weekends/market holidays rather than fabricating summaries.
- The user explicitly requires that I must not lie about work status, progress, or whether I am actively working on the requested main task. Preparation, side quests, or adjacent maintenance do not count as main-task progress and must not be presented that way.
- The user wants a reliable program/skill that reports real work state and task progress so they can verify whether I am actively working or idle.
- For clear main tasks, I should apply a hard main-task lock: no drifting into related side work, no counting adjacent setup as progress, and no showing versions that fail the user's explicit acceptance criteria.
- A task is not "done" just because local files were changed; if the user's real goal is a visible/public result, I should treat end-to-end completion as the standard before claiming it is finished.

## Voice interaction / ASR
- Local voice interaction pipeline is set up around `whisper.cpp` + `ffmpeg`.
- Current preferred local ASR model is `/home/shuaideyipi/.openclaw/tools/whisper.cpp/models/ggml-base.bin`.
- For mixed Chinese/English audio, do not force a single-language interpretation too early; compare multilingual auto, forced Chinese, and forced English passes when needed.

## Voice understanding policy
- Treat voice transcripts as noisy evidence rather than literal truth.
- Use a low-confidence confirmation policy when transcript quality or contextual fit is uncertain.
- Maintain a persistent personal dictionary and correction patterns for recurring terms and ASR mistakes.
- If a transcript sounds fluent but does not fit the conversation context, confirm instead of assuming recognition was correct.
- If a voice message has a clear main segment plus a fuzzy tail, preserve the clear intent and down-rank or ignore likely tail noise.

## Persistent voice assets created
- `skills/voice-intent-recovery/`
- `skills/voice-intent-recovery/references/personal-dictionary-v1.md`
- `skills/voice-intent-recovery/references/low-confidence-policy.md`
- `skills/voice-intent-recovery/references/correction-patterns.md`
- related entries in `.learnings/LEARNINGS.md`

## Scheduled briefings
- The user wants automatic briefings focused on A-shares, U.S. equities, international affairs, and macro drivers.
- Current trial schedule (Europe/Paris winter time):
  - 07:00 — A-share pre-close brief
  - 08:15 — A-share close summary
  - 14:15 — U.S. premarket brief
  - 21:40 — U.S. close summary
- Refinement after first run:
  - Drop the "A-shares/China implications for U.S. stocks" section unless it is truly material.
  - For both A-shares and U.S. equities, emphasize specific leading stocks and explain why they rose or fell.
  - For A-shares, include stronger board/sector + leading-stock coverage rather than only index-level summary.
  - For A-share tracking, prioritize nonferrous metals, power/utilities, grid equipment, gold/silver futures, crude oil, and other hot sectors.

## Quant finance teaching project
- The user wants a long-term, systematic quant finance learning program with me acting as teacher.
- Goal: progress from beginner level toward independent quant research, backtesting, and eventual small-scale practical trading use; do not frame this as guaranteed profits.
- Start with stock quant as the entry point, then later expand to ETF / index, futures, options, and possibly crypto.
- Preferred teaching format: one lesson per day, about 1–1.5 hours of study time, with Python examples and exercises by default.
- A companion teaching website should host daily lessons, course maps, practice, progress, and future interactive review tools.
- For market/trading analysis, the user wants me to first try to obtain the most accurate and up-to-date concrete data available (price, move, range, volume/context, catalyst) before giving judgment; avoid vague analysis when precise data is not available.
- A new local skill `skills/stock-watch/` is being built to support near-real-time U.S. stock watchlist monitoring and more concrete trading-assistant analysis.
- The user's current priority U.S. equity watchlist focus names are: LITE, MU, NVDA, NIBS, AAOI, and SNDK.

## Telegram config choice
- Telegram group access is currently disabled because the user mainly uses the bot in direct chat.
