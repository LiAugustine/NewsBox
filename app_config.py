from os import getenv, environ
from dotenv import find_dotenv, load_dotenv
from flask import Flask
from flask_talisman import (
    Talisman,
)  # Security extension for enforcing HTTP security headers

application = (
    Flask(  # access index.html which serves as the HTML entry-point to the React app
        __name__,
        static_folder="templates/assets",
    )
)

load_dotenv(find_dotenv())  # load env variables

GOOGLE_CLIENT_ID = getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = getenv("GOOGLE_CLIENT_SECRET")

# app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
application.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
application.config["SECRET_KEY"] = getenv("SECRET_KEY")


Talisman(
    application,
    force_https=False,
    content_security_policy=None,
)
