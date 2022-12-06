from os import getenv, environ
from flask import jsonify, render_template, request
from random import randrange
from newsapi import NewsApiClient
from app_config import application

from models import db, SavedQueries, SavedArticles, ViewedArticles

# The following routes correspond to frontend routes created by react-router-dom.
# Putting these routes ensures those routes load properly on a page-refresh.
@application.route("/")
@application.route("/Customize")
@application.route("/NewsSearch")
@application.route("/HotNews")
@application.route("/YourNews")
def index():
    """
    Home page, renders HTML entry point to React app.
    """
    return render_template("index.html")  # Entry point for React app.


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


# The following section handles the saved queries logic.
@application.route("/api/get_saved_queries", methods=["POST"])
def get_saved_queries():
    """
    POST method. Get logged-in user from React, return db query containing
    saved queries for that user.
    """
    data = request.json["user"]
    user_id = data.get("sub")  # sub corresponds to unique user ID created by google
    saved_queries = SavedQueries.query.filter_by(user_id=user_id).all()
    return jsonify([{"query": q.saved_query} for q in saved_queries])


@application.route("/api/save_query", methods=["POST"])
def save_query():
    """
    POST method. Get user and query from React, save to database, return updated queries to React.
    """
    q = request.json
    user_id = q.get("user_id")
    query = q.get("queryToBeAdded")
    new_query = SavedQueries(user_id=user_id, saved_query=query)
    db.session.add(new_query)
    db.session.commit()

    saved_queries = SavedQueries.query.filter_by(user_id=user_id).all()
    return jsonify([{"query": q.saved_query} for q in saved_queries])


@application.route("/api/delete_query", methods=["POST"])
def delete_query():
    """
    POST method. Get user and query to be deleted, then delete the query.
    Feed updated queries to React.
    """
    q = request.json
    user_id = q.get("user_id")
    saved_query = q.get("query")
    SavedQueries.query.filter_by(user_id=user_id, saved_query=saved_query).delete()
    db.session.commit()

    saved_queries = SavedQueries.query.filter_by(user_id=user_id).all()
    return jsonify([{"query": q.saved_query} for q in saved_queries])


@application.route("/api/get_saved_query_results", methods=["POST"])
def get_saved_query_results():
    """
    POST method. Get logged in user, then get search queries the user saved.
    Then, for each query, get news results from News API.
    Return results to React.
    """
    data = request.json["user"]
    user_id = data.get("sub")
    saved_queries = SavedQueries.query.filter_by(user_id=user_id).all()
    query_count = SavedQueries.query.filter_by(user_id=user_id).count()
    query_results = []
    newsapi = NewsApiClient(api_key=getenv("NEWS_API"))
    for q in saved_queries:
        search_data = newsapi.get_everything(
            q=q.saved_query,
            page_size=5,
        )
        article_info = search_data["articles"]
        query_results.append(article_info)

    return jsonify(query_results[randrange(query_count)])


@application.route("/api/save_article", methods=["POST"])
def save_article():
    """
    POST method. Get article info from frontend, then save to database.
    Try-except for handling situation where user already saved article
    (no duplicates allowed).
    """
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
    """
    POST method. Get logged in user from frontend, then query Saved Articles table.
    Return in JSON format using list-comprehension.
    """
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
    """
    POST method. Deletes saved article.
    Get logged in user from frontend and url of article to be deleted.
    Return updated saved articles to React.
    """
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
