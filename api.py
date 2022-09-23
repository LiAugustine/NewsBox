from os import getenv
from flask import Blueprint, jsonify, render_template, request
from newsapi import NewsApiClient

api = Blueprint(
    "api", __name__
)  # create blueprint to allow app.py to access the routes.


@api.route("/")
def index():
    """
    Home page, renders HTML entry point to React app.
    """
    return render_template("index.html")


@api.route("/api/get_hot_articles")
def get_hot_articles():
    """
    Using NewsApi python library, get top headlines in JSON format for the frontend.
    """
    newsapi = NewsApiClient(api_key=getenv("NEWS_API"))
    top_headlines = newsapi.get_top_headlines(
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


@api.route("/api/get_search_results", methods=["POST"])
def get_search_results():
    """
    POST method. Get search query from frontend, then return search results.
    """
    search_query = request.json["query"]
    newsapi = NewsApiClient(api_key=getenv("NEWS_API"))
    search_data = newsapi.get_everything(
        q=search_query.get("q"),
        sources=search_query.get("sources"),
        domains=search_query.get("domains"),
        to=search_query.get("to"),
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
