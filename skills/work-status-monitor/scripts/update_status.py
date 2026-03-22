#!/usr/bin/env python3
import json
import sys
from datetime import datetime
from pathlib import Path

STATUS_PATH = Path('/home/shuaideyipi/.openclaw/workspace/runtime/work-status.json')
STATUS_PATH.parent.mkdir(parents=True, exist_ok=True)

DEFAULT = {
    'state': 'idle',
    'task': '',
    'phase': '',
    'startedAt': None,
    'lastActiveAt': None,
    'updatedAt': None,
    'progressNote': '',
    'evidence': []
}


def load():
    if not STATUS_PATH.exists():
        return DEFAULT.copy()
    try:
        return {**DEFAULT, **json.loads(STATUS_PATH.read_text(encoding='utf-8'))}
    except Exception:
        return DEFAULT.copy()


def save(data):
    STATUS_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def main(argv):
    if len(argv) < 2:
        print('usage: update_status.py <state> [task] [phase] [progressNote] [evidence...]', file=sys.stderr)
        return 2

    state = argv[1]
    task = argv[2] if len(argv) > 2 else ''
    phase = argv[3] if len(argv) > 3 else ''
    progress = argv[4] if len(argv) > 4 else ''
    evidence = argv[5:] if len(argv) > 5 else []

    now = datetime.now().isoformat(timespec='seconds')
    data = load()

    if state == 'working' and not data.get('startedAt'):
        data['startedAt'] = now
    if state in {'idle', 'blocked', 'done'} and not task:
        task = data.get('task', '')

    data.update({
        'state': state,
        'task': task,
        'phase': phase,
        'lastActiveAt': now if state == 'working' else data.get('lastActiveAt'),
        'updatedAt': now,
        'progressNote': progress,
        'evidence': evidence,
    })

    if state == 'done':
        data['lastActiveAt'] = now
    if state == 'idle':
        data['phase'] = phase or ''

    save(data)
    print(json.dumps(data, ensure_ascii=False))
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
