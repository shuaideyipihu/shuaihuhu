#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <input-audio> <output-wav>" >&2
  exit 1
fi

in="$1"
out="$2"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg is required" >&2
  exit 1
fi

mkdir -p "$(dirname "$out")"
ffmpeg -y -i "$in" -ac 1 -ar 16000 -c:a pcm_s16le "$out" >/dev/null 2>&1
printf '%s\n' "$out"
