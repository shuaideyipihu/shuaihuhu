---
name: self-quality-gate
description: Enforce a self-review and auto-iteration loop before presenting work to the user. Use when the user expects high standards, dislikes rough first drafts, wants the assistant to judge whether output truly meets their requirements, or explicitly asks for automatic internal revision until the result is good enough before showing it.
---

# Self Quality Gate

Use this skill to prevent low-quality first drafts from being shown prematurely.

## Core promise

Do not hand the user a rough first version if the user's stated standard is clearly higher than the current output.

## When this skill applies strongly

Apply this skill when the user:
- explicitly says prior drafts were too rough, shallow, fluffy, or unsystematic
- wants professional, systematic, rigorous, product-quality, or textbook-quality work
- says they do not want to repeatedly point out obvious deficiencies
- asks for automatic internal revision before delivery

## Working rule

Before presenting a version to the user, run an internal gate with two questions:

1. **Requirement fit** — Does this version actually satisfy the user's explicit request?
2. **Quality bar fit** — Given the user's prior feedback, is this version good enough to show now?

If either answer is "no", continue revising instead of presenting it.

## Required review loop

For each meaningful draft:
1. Summarize the user's actual requirement in one sentence.
2. List the user's known quality bar / rejection criteria.
3. Score the draft on these dimensions from 0–2:
   - correctness
   - completeness
   - structure/systematic quality
   - specificity/data grounding
   - polish/usability
4. If any critical dimension is 0, do not present.
5. If total quality is clearly below the user's bar, revise again.
6. Only present when the output is at least plausibly acceptable by the user's own stated standard.

## Hard constraints

- Do not confuse planning/research with completed output.
- Do not present scaffolding as deliverable.
- Do not ask the user to provide feedback on defects that are already obvious from their prior complaints.
- Do not use the user as the primary QA layer for issues you can detect yourself.

## Delivery threshold

A version is presentable only if all are true:
- the core requested artifact exists in usable form
- the most obvious prior complaints are already addressed
- the output would not embarrassingly fail the user's last explicit standard

## Recommended implementation pattern

Before replying with a deliverable, write a short private checklist into a work file or scratch note such as:
- requirement:
- quality bar:
- current gaps:
- show now? yes/no

If `show now = no`, continue working.

## Example standard for this user

For this user, common failure modes include:
- vague market analysis without concrete data
- claiming progress when only side work happened
- course content that feels like fluffy plain-language filler rather than systematic teaching
- presenting filtered-out or weak candidates instead of the final shortlist

Assume those are disqualifying unless clearly fixed.
