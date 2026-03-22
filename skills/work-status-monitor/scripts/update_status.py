#!/usr/bin/env python3
import json
import sys
from datetime import datetime
from pathlib import Path

STATUS_PATH = Path('/home/shuaideyipi/.openclaw/workspace/runtime/work-status.json')
HISTORY_PATH = Path('/home/shuaideyipi/.openclaw/workspace/runtime/work-history.json')
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


def load_status():
    if not STATUS_PATH.exists():
        return DEFAULT.copy()
    try:
        return {**DEFAULT, **json.loads(STATUS_PATH.read_text(encoding='utf-8'))}
    except Exception:
        return DEFAULT.copy()


def save_status(data):
    STATUS_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def load_history():
    if not HISTORY_PATH.exists():
        return {'events': []}
    try:
        data = json.loads(HISTORY_PATH.read_text(encoding='utf-8'))
        if isinstance(data, dict) and isinstance(data.get('events'), list):
            return data
    except Exception:
        pass
    return {'events': []}


def save_history(data):
    HISTORY_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')


def main(argv):
    if len(argv) < 2:
        print('usage: update_status.py <state> [task] [phase] [progressNote] [evidence...]', file=sys.stderr)
        return 2

    state = argv[1]
    task = argv[2] if len(argv) > 2 else ''
    phase = argv[3] if len(argv) > 3 else ''
    progress = argv[4] if len(argv) > 4 else ''
    evidence = argv[5:] if len(argv) > 5 else []
    is_heartbeat = evidence == ['heartbeat']

    now = datetime.now().isoformat(timespec='seconds')
    data = load_status()

    if is_heartbeat:
        print(json.dumps(data, ensure_ascii=False))
        return 0

    if state == 'working' and not data.get('startedAt'):
        data['startedAt'] = now
    if state in {'idle', 'blocked', 'done'} and not task:
        task = data.get('task', '')

    progress_percent = data.get('progressPercent', 0)
    progress_items = data.get('progressItems', [])
    if evidence:
        progress_percent = min(100, max(progress_percent, 1) + 1)
    data.update({
        'state': state,
        'task': task,
        'phase': phase,
        'updatedAt': now,
        'progressNote': progress,
        'progressPercent': progress_percent,
        'progressItems': progress_items,
        'evidence': evidence,
    })

    if state == 'working':
        data['lastActiveAt'] = now
        if not data.get('startedAt'):
            data['startedAt'] = now
    elif state == 'done':
        data['lastActiveAt'] = now
    elif state == 'idle' and not data.get('startedAt'):
        data['startedAt'] = None

    history = load_history()
    history['events'].append({
        'at': now,
        'state': state,
        'task': data.get('task', ''),
        'phase': data.get('phase', ''),
        'progressNote': progress,
        'evidence': evidence,
    })
    history['events'] = history['events'][-50:]

    save_status(data)
    save_history(history)
    print(json.dumps(data, ensure_ascii=False))
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
