from app_config import application
from sqlalchemy import ForeignKey
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy(application)


class User(db.Model, UserMixin):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    picture = db.Column(db.Text, unique=False, nullable=True)
    account_id = db.Column(db.String(100), unique=True, nullable=False)
    google_id = db.Column(db.String(100), unique=True, nullable=True)


# class Favorite(db.Model, UserMixin):
#     __tablename__ = "Favorites"
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.String(100), ForeignKey("Users.account_id"))


db.create_all()
