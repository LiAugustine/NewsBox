from os import getenv, environ
from dotenv import find_dotenv, load_dotenv
from flask import Flask
from flask_talisman import (
    Talisman,
)  # Security extension for enforcing HTTP security headers
from api import api

app = Flask(  # access index.html which serves as the HTML entry-point to the React app
    __name__,
    static_folder="frontend/dist/assets",
    template_folder="frontend/dist",
)

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = getenv("SECRET_KEY")

Talisman(
    app,
    force_https=False,
    content_security_policy=None,
)

load_dotenv(find_dotenv())  # load env variables

app.register_blueprint(api)  # register routes from api.py file

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(environ.get("PORT", 5000)))
