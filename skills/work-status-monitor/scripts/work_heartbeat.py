#!/usr/bin/env python3
import json
import os
import signal
import sys
import time
from pathlib import Path

ROOT = Path('/home/shuaideyipi/.openclaw/workspace')
STATUS = ROOT / 'runtime' / 'status-heartbeat.json'


def save_meta(enabled, pid, task, phase, detail, interval, beat_at=None):
    STATUS.parent.mkdir(parents=True, exist_ok=True)
    STATUS.write_text(json.dumps({
        'enabled': enabled,
        'pid': pid,
        'task': task,
        'phase': phase,
        'detail': detail,
        'intervalSeconds': interval,
        'lastBeatAt': beat_at,
    }, ensure_ascii=False, indent=2), encoding='utf-8')


def main(argv):
    if len(argv) < 5:
        print('usage: work_heartbeat.py <task> <phase> <detail> <intervalSeconds>', file=sys.stderr)
        return 2
    task, phase, detail, interval = argv[1], argv[2], argv[3], int(argv[4])
    pid = os.getpid()
    try:
        while True:
            save_meta(True, pid, task, phase, detail, interval, time.strftime('%Y-%m-%dT%H:%M:%S'))
            time.sleep(interval)
    except KeyboardInterrupt:
        pass
    finally:
        save_meta(False, None, '', '', '', interval, time.strftime('%Y-%m-%dT%H:%M:%S'))
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
