from flask import Flask, jsonify, send_from_directory
from pathlib import Path
from datetime import datetime
import json

BASE = Path('/home/shuaideyipi/.openclaw/workspace/status-monitor')
STATUS = Path('/home/shuaideyipi/.openclaw/workspace/runtime/work-status.json')
HISTORY = Path('/home/shuaideyipi/.openclaw/workspace/runtime/work-history.json')

app = Flask(__name__, static_folder=str(BASE), static_url_path='')

DEFAULT = {
    'state': 'idle',
    'task': '',
    'phase': '',
    'startedAt': None,
    'lastActiveAt': None,
    'updatedAt': None,
    'progressNote': '',
    'progressPercent': 0,
    'progressItems': [],
    'evidence': []
}


def has_real_evidence(data):
    evidence = data.get('evidence') or []
    return bool(evidence) and evidence != ['heartbeat']


def is_real_history_event(item):
    evidence = item.get('evidence') or []
    return evidence != ['heartbeat']


def compute_confidence(data):
    last = data.get('lastActiveAt')
    if not last:
        return 'low'
    try:
        dt = datetime.fromisoformat(last)
        now = datetime.now(dt.tzinfo) if dt.tzinfo else datetime.now()
        seconds = (now - dt).total_seconds()
        if data.get('state') == 'working':
            if seconds <= 90 and has_real_evidence(data):
                return 'high'
            if seconds <= 300 and has_real_evidence(data):
                return 'medium'
        return 'low'
    except Exception:
        return 'low'

@app.get('/api/status')
def api_status():
    if not STATUS.exists():
        return jsonify({**DEFAULT, 'confidence': 'low', 'history': []})
    try:
        data = json.loads(STATUS.read_text(encoding='utf-8'))
        merged = {**DEFAULT, **data}
        merged['confidence'] = compute_confidence(merged)
        heartbeat = Path('/home/shuaideyipi/.openclaw/workspace/runtime/status-heartbeat.json')
        if heartbeat.exists():
            try:
                merged['heartbeat'] = json.loads(heartbeat.read_text(encoding='utf-8'))
            except Exception:
                merged['heartbeat'] = {'enabled': False}
        else:
            merged['heartbeat'] = {'enabled': False}
        if HISTORY.exists():
            try:
                hist = json.loads(HISTORY.read_text(encoding='utf-8'))
                events = hist.get('events') or []
                merged['history'] = [e for e in events if is_real_history_event(e)][-20:][::-1]
            except Exception:
                merged['history'] = []
        else:
            merged['history'] = []
        return jsonify(merged)
    except Exception as e:
        return jsonify({**DEFAULT, 'state': 'blocked', 'progressNote': f'状态文件读取失败: {e}', 'confidence': 'low', 'history': []})

@app.get('/')
def index():
    return send_from_directory(BASE, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=19001)
