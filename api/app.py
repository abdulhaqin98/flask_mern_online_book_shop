from distutils.log import debug
from urllib import request
from flask import Flask, flash, request, redirect, url_for, make_response, jsonify, send_from_directory, session
from flask_cors import CORS, cross_origin
import os
from termcolor import colored

import pickle
import pandas as pd
import numpy as np
import json

user_book_df = pickle.load(open('recommend_book.pkl','rb'))
df_isbn = pickle.load(open('recommend_isbn.pkl','rb'))

#

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
# CORS(app,resources={r"/api/*":{"origins":"*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'
os.system('color')

# CORS(app)

# @app.route('/api_book/recommend/<name>',methods=['GET','POST'])
# @cross_origin()
# def recommend_book(name):
#     return name

@app.route('/',methods=['GET','POST'])
def index_page():
    return "Flask Recommend Book Api"

@app.route('/api_book/recommend/<input_book>',methods=['GET','POST'])
def recommend_book(input_book):

    book_isbn_fetch = input_book
    
    input_book=user_book_df[input_book]
    input_book.sort_values(ascending=False)

    rec_book=user_book_df.corrwith(input_book).sort_values(ascending=False).head()
    rec_book_list=list(rec_book.index)
    
    # book_array = len(rec_book_list)

    # fetch isbn by book name

    isbn1 = df_isbn.loc[df_isbn["Book-Title"].isin(rec_book_list)]
    isbn2=isbn1.drop_duplicates(subset=["ISBN","ISBN"], keep="first")
    arr = isbn2.to_numpy()
    book_isbn_count = np.where(arr == book_isbn_fetch)

    #numpy ndarray

    tuple_len = book_isbn_count[0].size
    isbn_len = tuple_len

    isbn_list = []
    rec_isbn_list = []

    for x in range(0,isbn_len):
        isbn_list.append(arr[x][1])
    
    #

    # try to fetch recommend book first isbn
    # 'arr' contains list of all books for models

    for x in rec_book_list:
        rec_isbn = np.where(arr == x)
        isbn_position = rec_isbn[0][0]
        rec_isbn_list.append(arr[isbn_position][1])


    # merging two json-array to one json -> data

    data = {};
    data['current_book_isbn'] = json.dumps(isbn_list)
    data['recommend_books'] = json.dumps(rec_book_list)
    data['recommend_books_isbn'] = json.dumps(rec_isbn_list)

    # return json.dumps(rec_book_list)
    # response_json =  json.dumps(isbn_list)
    # response_json.append()

    # return response_json
    return data

if __name__ == "__main__":
    app.secret_key = 'ItIsASecret'
    app.debug = True
    app.run()