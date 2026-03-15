## [ERR-20260314-001] sessions_spawn

**Logged**: 2026-03-14T22:04:00Z
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
Initial sub-agent creation attempts used unsupported sessions_spawn parameters in this runtime.

### Error
```
streamTo is only supported for runtime=acp; got runtime=subagent
thread=true is unavailable because no channel plugin registered subagent_spawning hooks.
```

### Context
- Operation attempted: create persistent named sub-agents for a Telegram direct chat
- Parameters that failed: `streamTo` with `runtime=subagent`, then `thread=true`
- Environment: OpenClaw main agent session on Telegram

### Suggested Fix
For runtime=subagent in this environment, omit `streamTo` and `thread`, and use plain persistent session spawning.

### Metadata
- Reproducible: yes
- Related Files: /home/shuaideyipi/.openclaw/workspace/.learnings/ERRORS.md

---

## [ERR-20260315-001] web_search

**Logged**: 2026-03-15T08:13:00Z
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
web_search in this runtime rejected country and language filter parameters despite generic tool schema exposing them.

### Error
```
unsupported_country: country filtering is not supported by the gemini provider
unsupported_language: language filtering is not supported by the gemini provider
unsupported_date_filter: date_after/date_before filtering is not supported by the gemini provider
```

### Context
- Operation attempted: news search for US-Iran war coverage on 2026-03-14
- Parameters that failed: `country`, `language`
- Environment: OpenClaw web_search backed by gemini provider

### Suggested Fix
In this runtime, avoid provider-specific filters and be prepared to fall back to `web_fetch` or direct news site pages when `web_search` is misconfigured or missing a valid API key.

### Metadata
- Reproducible: yes
- Related Files: /home/shuaideyipi/.openclaw/workspace/.learnings/ERRORS.md

---
