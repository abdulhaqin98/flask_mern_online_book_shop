import flask
import os
from flask import send_from_directory

import pickle
import pandas as pd
import numpy as np
import json

user_book_df = pickle.load(open('recommend_book.pkl','rb'))
df_isbn = pickle.load(open('recommend_isbn.pkl','rb'))

app = flask.Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/favicon.png')

@app.route('/')
@app.route('/home')
def home():
    return "Hello World"

@app.route('/api_book/recommend/<input_book>',methods=['GET','POST'])
def recommend_book(input_book):

    book_isbn_fetch = input_book
    
    input_book=user_book_df[input_book]
    input_book.sort_values(ascending=False)

    rec_book=user_book_df.corrwith(input_book).sort_values(ascending=False).head()
    rec_book_list=list(rec_book.index)

    isbn1 = df_isbn.loc[df_isbn["Book-Title"].isin(rec_book_list)]
    isbn2=isbn1.drop_duplicates(subset=["ISBN","ISBN"], keep="first")
    arr = isbn2.to_numpy()
    book_isbn_count = np.where(arr == book_isbn_fetch)

    tuple_len = book_isbn_count[0].size
    isbn_len = tuple_len

    isbn_list = []
    rec_isbn_list = []

    for x in range(0,isbn_len):
        isbn_list.append(arr[x][1])

    for x in rec_book_list:
        rec_isbn = np.where(arr == x)
        isbn_position = rec_isbn[0][0]
        rec_isbn_list.append(arr[isbn_position][1])

    data = {};
    data['current_book_isbn'] = json.dumps(isbn_list)
    data['recommend_books'] = json.dumps(rec_book_list)
    data['recommend_books_isbn'] = json.dumps(rec_isbn_list)

    return data

if __name__ == "__main__":
    app.secret_key = 'ItIsASecret'
    app.debug = True
    app.run()