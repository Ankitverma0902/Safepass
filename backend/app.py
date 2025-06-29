
from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/check', methods=['POST'])
def check_password():
    data = request.get_json()
    password = data.get('password', '')
    sha1pass = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    prefix, suffix = sha1pass[:5], sha1pass[5:]
    response = requests.get(f"https://api.pwnedpasswords.com/range/{prefix}")
    hashes = (line.split(":") for line in response.text.splitlines())
    count = 0
    for h, c in hashes:
        if h == suffix:
            count = int(c)
            break
    return jsonify({'count': count})

if __name__ == '__main__':
    app.run(debug=True)
