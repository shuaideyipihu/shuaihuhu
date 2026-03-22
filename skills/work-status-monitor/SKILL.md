---
name: work-status-monitor
description: Track and report whether the assistant is actively working on a user-requested main task or idle, with explicit task name, phase, timestamps, and progress notes. Use when the user asks what the assistant is doing, wants verifiable work-state transparency, requests real-time task/progress monitoring, or when a task should expose honest active/idle status instead of vague assurances.
---

# Work Status Monitor

Use this skill to make work state visible and falsifiable.

## Core rule

Never report `working` unless the main task is actually being worked on in this turn or via an active background process dedicated to that task.

## State model

Use exactly one of these high-level states:
- `idle` — not actively working on the main task
- `working` — actively working on the main task
- `blocked` — cannot continue because of a concrete blocker
- `done` — requested deliverable completed and visible to the user

## Status file

Read and write:
- `/home/shuaideyipi/.openclaw/workspace/runtime/work-status.json`

If missing, create it.

Suggested schema:
```json
{
  "state": "idle",
  "task": "",
  "phase": "",
  "startedAt": null,
  "lastActiveAt": null,
  "updatedAt": null,
  "progressNote": "",
  "evidence": []
}
```

## Update rules

### When starting a real task
Set:
- `state = working`
- `task` = user-visible task name
- `phase` = current phase like `research`, `writing`, `editing`, `publishing`
- `startedAt` if empty
- `lastActiveAt` = now
- `updatedAt` = now
- `progressNote` = one concrete sentence describing what is being changed now
- `evidence` = optional short list of concrete touched files or commands

### While continuing real work
Refresh:
- `lastActiveAt`
- `updatedAt`
- `phase`
- `progressNote`
- `evidence`

Do not refresh if not actually working.

### When blocked
Set:
- `state = blocked`
- explain the blocker plainly in `progressNote`

### When stopped or switching away
If no longer working on the main task, set:
- `state = idle`
- update `progressNote` honestly

### When finished
Set:
- `state = done`
- `progressNote` = what is complete and where the user can see it

## Honesty constraints

- Side tasks do not count as progress on the main task.
- Reading, planning, apologizing, or discussing future work do not count as `working` unless the user explicitly requested those as the deliverable.
- If the user asks "what are you doing now?" answer from the status file only after updating it honestly.

## Recommended helper

Use a small script to update the status file consistently. Store it under:
- `scripts/update_status.py`

Keep the script simple and deterministic.
