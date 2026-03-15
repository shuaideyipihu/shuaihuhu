#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <audio-file> [--language zh] [--model base]" >&2
  exit 1
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
workspace_dir="$(cd "$script_dir/../../.." && pwd)"
local_whisper="$workspace_dir/skills/local-whisper/scripts/transcribe.py"
venv_python="$workspace_dir/skills/local-whisper/.venv/bin/python"

if [[ ! -f "$local_whisper" ]]; then
  echo "Error: local-whisper is not installed at $workspace_dir/skills/local-whisper" >&2
  exit 1
fi

if [[ -x "$venv_python" ]]; then
  "$venv_python" "$local_whisper" "$@"
else
  python3 "$local_whisper" "$@"
fi
