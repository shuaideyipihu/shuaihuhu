# Learnings

## [LRN-20260315-VOICE-001] best_practice

**Logged**: 2026-03-15T15:45:00+01:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
Voice transcripts should be treated as noisy evidence rather than literal truth.

### Details
For Telegram voice interaction, ASR output may contain phonetic substitutions, missing particles, merged phrases, or domain-term corruption. The assistant performs better when it reconstructs likely intent from context and recent task state instead of over-trusting raw transcript text.

### Suggested Action
Use the `voice-intent-recovery` skill on noisy transcripts, maintain a persistent lexicon of recurring technical terms, and store reusable repair patterns for future sessions.

### Metadata
- Source: conversation
- Related Files: skills/voice-intent-recovery/SKILL.md
- Tags: voice, asr, transcript, recovery, personalization
- Pattern-Key: voice.intent-recovery

---
