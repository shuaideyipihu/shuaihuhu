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

## [LRN-20260315-VOICE-004] correction

**Logged**: 2026-03-15T15:56:00+01:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
When a voice transcript sounds fluent but does not fit conversation context, ask for confirmation instead of assuming recognition was successful.

### Details
The user intentionally sent a mumbled audio clip to test low-confidence handling. I incorrectly accepted a plausible English sentence as correct because the transcript looked syntactically valid. The missing step was contextual anomaly detection: even fluent ASR output can be low-confidence if it does not match the active topic or user intent pattern.

### Suggested Action
Extend low-confidence voice handling so context mismatch increases ambiguity score. For fluent-but-odd transcripts, ask a short confirmation question before answering.

### Metadata
- Source: user_feedback
- Related Files: skills/voice-intent-recovery/references/low-confidence-policy.md
- Tags: voice, asr, correction, context, confirmation
- Pattern-Key: voice.context-anomaly-confirmation

---

## [LRN-20260315-VOICE-005] best_practice

**Logged**: 2026-03-15T16:10:00+01:00
**Priority**: high
**Status**: pending
**Area**: config

### Summary
Mixed Chinese/English audio should be checked with multilingual base transcription plus forced per-language passes instead of relying on tiny auto-detect alone.

### Details
A mixed-language voice test was badly collapsed into English when using the tiny multilingual model. Re-running with the base multilingual model improved results substantially and recovered both a Chinese segment and a clean English segment. For bilingual audio, a better workflow is: run multilingual auto first, then compare forced-zh and forced-en outputs to identify language boundaries and reduce cross-language corruption.

### Suggested Action
Upgrade the local whisper.cpp path from tiny to base for default use, and treat mixed-language audio as a special case requiring multi-pass comparison.

### Metadata
- Source: conversation
- Related Files: ~/.openclaw/openclaw.json
- Tags: voice, asr, bilingual, zh, en, whisper.cpp
- Pattern-Key: voice.bilingual-multipass

---

## [LRN-20260322-UI01] correction

**Logged**: 2026-03-22T07:36:25.294581Z
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary
When asked to add strong Iron Man elements, do not over-pack the interface with visual motifs at the expense of hierarchy and readability.

### Details
The user said the redesigned app felt chaotic and messy. I overcorrected from generic sci-fi into too many Iron Man cues at once: multiple overlays, dense framing, too many decorative structures, and insufficient restraint. The right standard is not just stronger theme fidelity, but stronger composition discipline.

### Suggested Action
For themed redesigns, keep one dominant hero motif, one secondary motif, and simplify the rest of the UI into clear modules with strong spacing and visual hierarchy.

### Metadata
- Source: user_feedback
- Related Files: status-monitor/index.html
- Tags: ui, theme, hierarchy, iron-man

---
