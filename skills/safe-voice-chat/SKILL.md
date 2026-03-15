---
name: safe-voice-chat
description: Safe, local-first voice note handling for Telegram/OpenClaw. Use when the user sends a voice message or audio clip and wants speech-to-text transcription, voice-driven conversation, or a safer alternative to cloud speech recognition. Prefer offline transcription via local-whisper; reply in text by default, and only use optional text-to-speech if the user explicitly wants spoken replies and a trusted TTS path is configured.
---

# Safe Voice Chat

Prefer a **local-first** workflow:

1. Accept the incoming audio/voice file.
2. Normalize it with `scripts/prepare-audio.sh`.
3. Transcribe it with local Whisper using `scripts/transcribe-voice.sh`.
4. Answer normally in text unless the user explicitly asks for spoken replies.
5. If spoken replies are requested, use a separately-audited TTS path; do not invent one.

## Why this skill exists

Most voice-chat skills mix together:
- message transport
- audio conversion
- speech recognition
- cloud APIs
- auto-reply behavior

That is convenient but increases risk. This skill keeps the default path simple:
- **offline STT when possible**
- **text replies by default**
- **no hidden outbound API calls** for transcription

## Required dependency

Install and use `skills/local-whisper` for transcription.

Its main script is:

```bash
python3 {workspace}/skills/local-whisper/scripts/transcribe.py <audio-file> --model base
```

## Workflow

### 1) Prepare audio

Convert Telegram/phone audio into a Whisper-friendly WAV:

```bash
{baseDir}/scripts/prepare-audio.sh input.ogg /tmp/voice.wav
```

This produces:
- mono
- 16 kHz
- PCM WAV

### 2) Transcribe locally

```bash
{baseDir}/scripts/transcribe-voice.sh /tmp/voice.wav --language zh --model base
```

If the language is unknown, omit `--language` and let Whisper auto-detect.

### 3) Respond

- If the user asked a question, answer the content of the transcription.
- If transcription confidence seems poor, quote the uncertain phrase and ask for confirmation.
- Keep private audio local unless the user explicitly approves a cloud STT/TTS route.

## Safety rules

- Prefer local transcription over cloud APIs.
- Do not upload user audio to third-party services unless the user explicitly asks.
- Do not auto-forward audio files anywhere.
- If a requested TTS route is not installed or audited, say so and reply in text.
- For sensitive voice notes, summarize minimally and avoid unnecessary retention.

## Good defaults

- Chinese voice note: `--language zh --model base`
- Mixed Chinese/English or uncertain audio: omit language, use `--model small` if latency is acceptable
- Noisy audio: prepare audio first, then try `small` or `turbo`

## Example commands

```bash
# OGG/Opus voice note -> WAV
{baseDir}/scripts/prepare-audio.sh voice.ogg /tmp/voice.wav

# Fast local transcript
{baseDir}/scripts/transcribe-voice.sh /tmp/voice.wav --language zh --model base

# Better accuracy
{baseDir}/scripts/transcribe-voice.sh /tmp/voice.wav --model small
```

## Limits

This skill handles the **safe STT part** well. Full voice-to-voice chat also needs a trusted TTS path plus channel support for sending audio replies.
