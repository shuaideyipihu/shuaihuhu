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

## [LRN-20260315-VOICE-002] best_practice

**Logged**: 2026-03-15T15:46:00+01:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
Use a low-confidence confirmation policy for noisy voice transcripts instead of treating all transcripts equally.

### Details
Voice interaction quality improves when transcript handling is confidence-aware. High-confidence transcripts can be answered directly, medium-confidence transcripts should use lightweight confirmation, and low-confidence transcripts should trigger a short focused clarification question. This preserves speed while reducing semantic drift.

### Suggested Action
Maintain a dedicated low-confidence policy and apply it whenever ASR text is noisy or ambiguous.

### Metadata
- Source: conversation
- Related Files: skills/voice-intent-recovery/references/low-confidence-policy.md
- Tags: voice, asr, confirmation, ambiguity
- Pattern-Key: voice.low-confidence-confirmation

---

## [LRN-20260315-VOICE-003] best_practice

**Logged**: 2026-03-15T15:47:00+01:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
A persistent personal dictionary improves recovery of user-specific terms across sessions.

### Details
Many voice-recognition failures come from domain terms, product names, recurring workflows, and user-preferred phrasing. Storing these in a persistent dictionary provides a reusable adaptation layer that survives session resets and improves future interpretation.

### Suggested Action
Maintain and expand a per-user voice dictionary with recurring tools, concepts, intents, and restoration targets.

### Metadata
- Source: conversation
- Related Files: skills/voice-intent-recovery/references/personal-dictionary-v1.md
- Tags: voice, asr, personalization, dictionary
- Pattern-Key: voice.personal-dictionary

---
