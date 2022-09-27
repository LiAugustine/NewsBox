from os import getenv
import json
import requests
from uuid import uuid1
from flask import Blueprint, redirect, request
from flask_login import login_user
from oauthlib.oauth2 import WebApplicationClient

from models import db, User

# create blueprint to allow app.py to access the routes.
google_login = Blueprint("google_login", __name__)

GOOGLE_CLIENT_ID = getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = getenv("GOOGLE_CLIENT_SECRET")

client = WebApplicationClient(GOOGLE_CLIENT_ID)
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"


def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()


@google_login.route("/google_login")
def login():
    """
    This function routes to Google Login page.
    """
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = (
        google_provider_cfg["authorization_endpoint"] + "?prompt=select_account"
    )  # Make user select a google account even if they are already logged into one.

    redirect_uri = (
        request.base_url.replace("http://", "https://")
        if request.base_url != "http://127.0.0.1:5000/google_login"
        else request.base_url
    ) + "/callback"

    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=redirect_uri,
        scope=["openid", "email", "profile"],
    )
    # print(request.base_url + "/callback")
    return redirect(request_uri)


@google_login.route("/google_login/callback")
def callback():
    """
    Handles the callback.
    """

    code = request.args.get("code")

    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=(
            request.base_url.replace("http://", "https://")
            if request.base_url != "http://127.0.0.1:5000/google_login/callback"
            else request.base_url
        ),
        code=code,
    )

    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        name = userinfo_response.json()["name"]  # get name of user
        google_id = userinfo_response.json()["sub"]  # get unique google id
        picture = userinfo_response.json()["picture"]
        # users_email = userinfo_response.json()["email"]
        # users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    exists = User.query.filter_by(google_id=google_id).first()
    if not exists:
        db.session.add(
            User(name=name, picture=picture, google_id=google_id, account_id=uuid1())
        )
        db.session.commit()
    user = User.query.filter_by(google_id=google_id).first()
    login_user(user)
    return redirect("/")
