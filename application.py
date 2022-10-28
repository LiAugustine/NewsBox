from os import getenv, environ
from flask import jsonify, render_template, request
from newsapi import NewsApiClient

from app_config import application

from models import db, SavedArticles

# Makes sure all routes load the page.
@application.route("/")
@application.route("/NewsSearch")
@application.route("/YourNews")
def index():
    """
    Home page, renders HTML entry point to React app.
    """
    return render_template("index.html")


@application.route("/api/get_hot_articles")
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


@application.route("/api/get_search_results", methods=["POST"])
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


@application.route("/api/save_search_query", methods=["POST"])
def save_search_query():
    pass


@application.route("/api/save_article", methods=["POST"])
def save_article():
    article = request.json

    new_article = SavedArticles(
        user_id=article.get("user_id"),
        url=article.get("url"),
        title=article.get("title"),
        description=article.get("description"),
        image=article.get("image"),
        author=article.get("author"),
        published_at=article.get("publishedAt"),
    )
    try:
        db.session.add(new_article)
        db.session.commit()
        return jsonify("You saved the article " + article.get("title"))
    except:
        return jsonify("You already saved the article " + article.get("title"))


@application.route("/api/get_saved_articles", methods=["POST"])
def get_saved_articles():
    data = request.json["user"]
    user_id = data.get("sub")
    saved_articles = SavedArticles.query.filter_by(user_id=user_id).all()

    return jsonify(
        [
            {
                "url": article.url,
                "title": article.title,
                "description": article.description,
                "image": article.image,
                "author": article.author,
                "publishedAt": article.published_at,
            }
            for article in saved_articles
        ]
    )


@application.route("/api/delete_article", methods=["POST"])
def delete_article():
    article = request.json
    user_id = article.get("user_id")
    url = article.get("url")
    SavedArticles.query.filter_by(user_id=user_id, url=url).delete()
    db.session.commit()

    saved_articles = SavedArticles.query.filter_by(user_id=user_id).all()
    return jsonify(
        [
            {
                "url": article.url,
                "title": article.title,
                "description": article.description,
                "image": article.image,
                "author": article.author,
                "publishedAt": article.published_at,
            }
            for article in saved_articles
        ]
    )


if __name__ == "__main__":
    application.run(host="0.0.0.0", port=int(environ.get("PORT", 5000)))
