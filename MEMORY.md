# MEMORY

## User preferences
- Persistent technical/system learnings should be kept in English.
- The user plans to gradually interact more in English over time.

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
- Let this run for a day first, then evaluate and refine.

## Telegram config choice
- Telegram group access is currently disabled because the user mainly uses the bot in direct chat.
