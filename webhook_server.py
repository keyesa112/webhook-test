import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime, timezone

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length)

        try:
            data = json.loads(raw.decode("utf-8"))
        except Exception:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"invalid json")
            return

        record = {
            "received_at": datetime.now(timezone.utc).isoformat(),
            "device": data.get("device"),
            "sender": data.get("sender"),
            "name": data.get("name"),
            "member": data.get("member"),
            "message": data.get("message"),
            "raw": data
        }

        print(json.dumps(record, ensure_ascii=False))

        with open("dataset_fonnte.jsonl", "a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")

        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")

if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 8000), Handler)
    print("Listening on http://0.0.0.0:8000")
    server.serve_forever()
