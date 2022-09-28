from os import getenv, environ
from flask import jsonify, render_template, request, redirect
from flask_login import LoginManager, current_user, login_required, logout_user
from newsapi import NewsApiClient

from app_config import application
from models import db, User
from google_login import google_login

login_manager = LoginManager()
login_manager.init_app(application)
login_manager.login_view = "login"


@login_manager.unauthorized_handler
def unauthorized():
    """
    Message is displayed when a page requires logging in
    to access, json format.
    """
    return jsonify("You must be logged in to perform this action!")


@login_manager.user_loader
def load_user(user_name):
    """
    Loads the user via flask-login.
    """
    return User.query.get(user_name)


@application.route("/logout")
@login_required
def logout():
    """
    Logs the user out through flask-login
    and returns to the home page.
    """
    logout_user()
    return redirect("/")


@application.route("/api/get_user_data")
def get_user():
    """
    Gets user info if user is logged in.
    """
    if current_user.is_authenticated:
        print(
            "Current logged in user: " + current_user.name
        )  # print for debugging authentication
        return jsonify(
            {
                "id": current_user.account_id,
                "name": current_user.name,
                "picture": current_user.picture,
            }
        )
    return jsonify(False)


@application.route("/")
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


application.register_blueprint(google_login)  # register google login routes

if __name__ == "__main__":
    application.run(host="0.0.0.0", port=int(environ.get("PORT", 5000)))
