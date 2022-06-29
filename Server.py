from werkzeug.wrappers import Request, Response
from flask import Flask,render_template,send_file,make_response,request
import json
import pandas as pd
import numpy as np
import random

IP = 'localhost'
PORT = 9001
DEF_MAP_SIZE = (3,3)

app = Flask(__name__)

app.config["CACHE_TYPE"] = "null"  

@app.route('/favicon.ico')
def icon():
    return None

@app.route('/')
def default():
    return render_template('main.html')


@app.route('/images/<img>')
def image(img):
    path='images\\'+img
    return send_file(path, mimetype='image')#/gif

@app.route('/<page>')
def rout(page):
    return render_template(page+'.html')


@app.route('/game/generatemap', methods=['GET'])
def map():
    #Generate MAP as dataframe matrix
    map_size = request.args.get('map_size',DEF_MAP_SIZE)
    df = pd.DataFrame(np.zeros(map_size))
    resp = make_response(df.to_csv())
    resp.headers["Content-Disposition"] = "attachment; filename=export.csv"
    resp.headers["Content-Type"] = "text/csv"
    return resp

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple(IP, PORT, app,reloader_interval = 5000)