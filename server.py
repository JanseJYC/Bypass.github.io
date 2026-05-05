#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.request
from urllib.parse import urlparse, parse_qs

class BypassHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        
        if parsed.path == '/bypass':
            query = parse_qs(parsed.query)
            delta_url = query.get('url', [''])[0]
            api_key = query.get('api_key', [''])[0]
            
            if not delta_url:
                self.send_json({'error': True, 'message': '缺少url参数'})
                return
            
            api_url = f'https://api.bypass.lat/bypass/premium/delta?url={delta_url}'
            if api_key:
                api_url += f'&api_key={api_key}'
            
            try:
                req = urllib.request.Request(api_url, headers={'User-Agent': 'DeltaClient/1.0'})
                with urllib.request.urlopen(req, timeout=15) as response:
                    data = json.loads(response.read().decode())
                    self.send_json(data)
            except Exception as e:
                self.send_json({'error': True, 'message': str(e)})
        
        elif parsed.path == '/':
            self.send_html()
        else:
            self.send_json({'error': True, 'message': 'Not found'}, 404)
    
    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def send_html(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        with open('index.html', 'r', encoding='utf-8') as f:
            self.wfile.write(f.read().encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.end_headers()

if __name__ == '__main__':
    port = 8000
    print(f'Server running at http://0.0.0.0:{port}')
    HTTPServer(('0.0.0.0', port), BypassHandler).serve_forever()