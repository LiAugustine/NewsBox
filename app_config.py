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

environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # set environment to HTTPS

application.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
if application.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    application.config["SQLALCHEMY_DATABASE_URI"] = application.config[
        "SQLALCHEMY_DATABASE_URI"
    ].replace("postgres://", "postgresql://")

application.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
application.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_pre_ping": True
}  # possible fix to error
application.secret_key = getenv("SECRET_KEY")


Talisman(
    application,
    force_https=False,
    content_security_policy=None,
)
