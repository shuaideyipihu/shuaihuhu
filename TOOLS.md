# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## Voice / ASR Notes

- Local voice transcription path currently uses `whisper.cpp`
- Binary: `/home/shuaideyipi/.openclaw/tools/whisper.cpp/build/bin/whisper-cli`
- Model: `/home/shuaideyipi/.openclaw/tools/whisper.cpp/models/ggml-tiny.bin`
- For Telegram `.ogg` voice notes, convert to mono 16k WAV with `ffmpeg` before transcription
- Use semantic recovery for noisy transcripts; do not trust literal wording blindly

Add whatever helps you do your job. This is your cheat sheet.
