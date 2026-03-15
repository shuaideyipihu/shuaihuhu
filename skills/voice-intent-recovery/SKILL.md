---
name: voice-intent-recovery
description: Recover user intent from noisy voice transcripts and imperfect ASR output. Use when a message contains an audio transcript, when wording looks garbled or phonetically corrupted, when speech-to-text is likely inaccurate due to accent/noise/audio quality, or when the assistant should infer the intended meaning before answering. Also use when the user corrects a prior voice-transcript misunderstanding so the correction can be persisted for future sessions.
---

# Voice Intent Recovery

Treat voice transcripts as **noisy evidence**, not ground truth.

## Core rule

Prioritize **intended meaning** over literal tokens when transcript text looks phonetically corrupted, fragmented, or semantically odd.

## Workflow

1. **Detect likely ASR noise**
   Look for:
   - odd word substitutions that sound similar to plausible words
   - broken grammar with otherwise obvious intent
   - domain terms likely mangled by speech-to-text
   - transcript content that fits recent context only after small corrections

2. **Generate 1-3 candidate reconstructions**
   Reconstruct what the user most likely meant.
   Focus on:
   - homophones / near-homophones
   - missing function words
   - merged or split phrases
   - domain-specific terms from recent context

3. **Score by context**
   Prefer the reconstruction that best matches:
   - the current task
   - recent conversation topic
   - the user's known interests / recurring vocabulary
   - the smallest number of edits needed to produce a coherent intent

4. **Respond by confidence**
   - **High confidence:** answer directly.
   - **Medium confidence:** answer, but briefly surface your interpretation.
   - **Low confidence:** ask a focused clarification question instead of pretending certainty.

5. **Persist useful corrections**
   If the user corrects a transcript misunderstanding, or if a recurring mistranscription pattern becomes clear:
   - update `references/user-lexicon.md`
   - update `references/personal-dictionary-v1.md` when the term is user-specific
   - append a short note to `references/correction-patterns.md`
   - if broadly useful, add a concise workflow note to workspace memory/docs

6. **Apply low-confidence policy**
   Use `references/low-confidence-policy.md` to decide whether to:
   - answer directly
   - answer with lightweight confirmation
   - ask a focused clarification question

## Response policy

When confidence is not high, use one of these patterns:

- "我理解你是在问：……如果我偏了你纠正我。"
- "我先按这个意思回答：……"
- "这句转写有点糊，我现在有两个理解：A / B，你指哪个？"

Keep the confirmation lightweight. Do **not** over-interrogate the user.

## Personal adaptation

Before reconstructing difficult voice transcripts, read:
- `references/user-lexicon.md`
- `references/correction-patterns.md`

Use them as a persistent adaptation layer for this user's:
- common topics
- preferred vocabulary
- repeated technical terms
- repeated ASR confusions

## Updating the adaptation files

### Update `user-lexicon.md` when:
- the user repeatedly mentions the same tool, project, person, or concept
- a domain term is likely to recur
- a preferred wording is obvious

### Update `correction-patterns.md` when:
- the same kind of mistranscription appears more than once
- a correction teaches a reusable mapping
- a phrase pattern repeatedly needs semantic repair

Keep entries short, concrete, and reusable.

## Safety / reliability

- Never silently reinterpret high-stakes requests (money, deletion, credentials, external actions) from a low-confidence transcript.
- For sensitive actions, ask for confirmation if transcript quality is poor.
- Do not invent missing details when multiple interpretations remain plausible.

## Example strategy

Transcript:
- "用通锁一種的话给我讲接一下你干了什么"

Possible reconstructions:
- "用通俗一种的话给我讲解一下你干了什么"
- "用通俗一点的话给我讲解一下你干了什么"

Best interpretation:
- "用通俗一点的话给我讲解一下你刚刚干了什么"

Why:
- fits conversation context
- requires minimal edits
- yields a natural user request
