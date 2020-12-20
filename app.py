#!/usr/local/bin/python

from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__, static_url_path='')
#app.debug = True

code = ["0"] * 3

@app.route('/')
def index(name=None):
    #generate a random 3 digit code without recurrence
    code[0] = random.randint(1,9)
    while True:
        code[1] = random.randint(1,9)
        if code[1] != code[0]:
            break
    while True:
        code[2] = random.randint(1,9)
        if code[2] != code[0] and code[2] != code[1]:
            break

    print(code);
    return render_template('index.html', name=name)

@app.route('/compareCode', methods = ["POST"])
def check(name=None):
    if request.method == "POST":
        data = request.json
        print(data[2])
        code = 2
        return jsonify(code = code)
