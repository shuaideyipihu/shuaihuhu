# Low-Confidence Confirmation Policy

Use this when a voice transcript is understandable only after reconstruction, or when multiple interpretations remain plausible.

## Confidence bands

### High confidence
Conditions:
- one interpretation is clearly best
- fits recent context cleanly
- only minor phonetic/wording repair needed

Action:
- answer directly
- no confirmation needed

### Medium confidence
Conditions:
- best interpretation exists, but transcript is noticeably noisy
- one or two alternative readings are still possible
- wrong answer would be mildly confusing but not risky

Action:
- answer while briefly surfacing interpretation
- preferred patterns:
  - "我先按这个意思回答：……"
  - "我理解你是在问：……我先接着说。"
  - "如果我理解偏了你纠正我。"

### Low confidence
Conditions:
- two or more readings remain plausible
- the request could change meaning materially depending on interpretation
- transcript is badly corrupted or too short to anchor

Action:
- ask a focused clarification question
- do not ask broad/open-ended questions
- preferred patterns:
  - "这句转写有点糊，我现在有两个理解：A / B，你指哪个？"
  - "我目前更偏向理解成：……，对吗？"
  - "你是想让我做 A，还是 B？"

## Sensitive-action rule

Always confirm before acting when transcript confidence is not high and the request involves:
- deletion
- money / purchases
- credentials / secrets
- public posting / outbound messaging
- irreversible system changes

## Style rules

- Keep confirmations short.
- Prefer binary or 2-option confirmations.
- Do not dump internal reasoning.
- If clarification is needed, preserve momentum by showing the likely interpretation.

## Examples

Transcript: "给我讲接一下你刚刚干了什么"

Interpretation quality: medium-high
Good response:
- "我理解你是在让我用更通俗的话总结刚才做了什么。我先直接说……"

Transcript: "把那个删掉然后发出去"
Context unclear.
Interpretation quality: low
Good response:
- "这句我不想硬猜。你是指删掉哪个东西？删完后要发给谁？"
