from os import getenv
from dotenv import find_dotenv, load_dotenv
from flask import Flask, jsonify, render_template
from newsapi import NewsApiClient

app = Flask(
    __name__,
    static_folder="frontend/dist/assets",
    template_folder="frontend/dist",
)

load_dotenv(find_dotenv())


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/get_hot_articles")
def get_hot_articles():

    newsapi = NewsApiClient(api_key=getenv("NEWS_API"))
    top_headlines = newsapi.get_top_headlines(
        q="news",
        category="business",
        language="en",
        country="us",
    )
    article_info = top_headlines["articles"]
    return jsonify(
        [
            {
                "author": article["author"],
                "title": article["title"],
                "description": article["description"],
                "url": article["url"],
                "urlToImage": article["urlToImage"],
                "publishedAt": article["publishedAt"],
            }
            for article in article_info
        ]
    )


if __name__ == "__main__":
    app.run()
