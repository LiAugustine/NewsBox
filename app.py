from os import getenv
from dotenv import find_dotenv, load_dotenv
from requests import get
import json
from flask import Flask, jsonify, render_template

app = Flask(
    __name__,
    static_folder="frontend/dist/assets",
    template_folder="frontend/dist",
)

load_dotenv(find_dotenv())

NEWS_API = getenv("NEWS_API")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/get_news_articles")
def get_news_articles():

    news_articles = get(
        f"https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&apiKey={NEWS_API}"
    )
    json_data = news_articles.json()
    print(json_data)
    return jsonify(json_data["totalResults"])


if __name__ == "__main__":
    app.run()
