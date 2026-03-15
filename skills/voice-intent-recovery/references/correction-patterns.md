# Correction Patterns

Persistent repair patterns for noisy voice transcripts.

## Rules of thumb

- Prefer semantic coherence over literal token fidelity.
- Prefer the smallest edit set that produces a natural sentence.
- Use recent conversation context as a strong prior.
- Treat domain terms as high-probability anchors.

## Reusable repair patterns

### Plain-language explanation requests
Common noisy forms may map toward:
- "用通俗一点的话讲一下……"
- "简单解释一下……"
- "承接一下你刚刚做的，讲一下……"

### Operation-summary requests
When transcript contains fragments like:
- "你刚刚……操作……"
- "讲解一下你干了什么"
- "承接一下"

Likely intent:
- explain recent actions in simpler language
- summarize progress
- restate the last technical steps

### Voice-transcript recovery heuristics
- "讲接" often suggests "讲解"
- odd tokens near "通锁/通俗" may point to "通俗"
- missing particles are common; restore only if it improves meaning clearly
- if a transcript almost forms a natural request after 1-3 phonetic edits, prefer that reading

## Logging format for new recurring patterns

- Noisy form:
- Likely intended form:
- Context:
- Confidence:
- Notes:
