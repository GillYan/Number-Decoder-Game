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
        circle = 0;     #circle representing numbers that are correct and in the correct position 
        triangle = 0;   #triangle representing numbers that are correct but in the wrong position
        data = request.json     #user entered code

        #get number of digits in correct position        
        for i in range(len(data)):
            if data[i] == str(code[i]):
                circle += 1

        #get number of correct digits
        for i in range(len(code)):
            if str(code[i]) in data:
                triangle += 1      


        triangle -= circle

        print(triangle)
        print(circle)

        return jsonify(circle = circle, triangle = triangle)
