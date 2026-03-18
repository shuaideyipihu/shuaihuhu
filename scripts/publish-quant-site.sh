#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/shuaideyipi/.openclaw/workspace"
SRC="$ROOT/quant-course/site"
DST="$ROOT/docs"
VERSION="$(date +%Y%m%d-%H%M)"

mkdir -p "$DST"
cp -r "$SRC"/* "$DST"/

python3 - <<PY
from pathlib import Path
p = Path("$DST/index.html")
text = p.read_text(encoding='utf-8')
import re
text = re.sub(r'styles\\.css\\?v=[^"\']+', f'styles.css?v=$VERSION', text)
text = re.sub(r'app\\.js\\?v=[^"\']+', f'app.js?v=$VERSION', text)
p.write_text(text, encoding='utf-8')
PY

git -C "$ROOT" add docs
git -C "$ROOT" commit -m "Publish quant site ($VERSION)" || true

echo "Docs synced. Next step: git -C $ROOT push"
