from os import getenv, environ
from dotenv import find_dotenv, load_dotenv
from flask import Flask, jsonify, render_template, request
from newsapi import NewsApiClient  # Python client library to make NewsAPI requests

app = Flask(  # access index.html which serves as the HTML entry-point to the React app
    __name__,
    static_folder="frontend/dist/assets",
    template_folder="frontend/dist",
)

load_dotenv(find_dotenv())  # load env variables


@app.route("/")
def index():
    """
    Home page, renders HTML entry point to React app.
    """
    return render_template("index.html")


@app.route("/api/get_hot_articles")
def get_hot_articles():
    """
    Using NewsApi python library, get top headlines in JSON format for the frontend.
    """
    newsapi = NewsApiClient(api_key=getenv("NEWS_API"))
    top_headlines = newsapi.get_top_headlines(
        q="news",
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


@app.route("/api/get_search_results", methods=["POST"])
def get_search_results():
    """
    POST method. Get search query from frontend, then return search results.
    """
    search_query = request.json["query"]
    newsapi = NewsApiClient(api_key=getenv("NEWS_API"))
    search_data = newsapi.get_everything(
        q=search_query.get("q"),
        qintitle="",
        sources="",
        domains="",
    )
    article_info = search_data["articles"]
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
    app.run(host="0.0.0.0", port=int(environ.get("PORT", 5000)))
