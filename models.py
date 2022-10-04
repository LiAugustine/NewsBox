from app_config import application
from sqlalchemy import ForeignKey
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(application)


class Users(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    picture = db.Column(db.Text, unique=False, nullable=True)
    account_id = db.Column(db.String(100), unique=True, nullable=False)


class SavedQueries(db.Model):
    __tablename__ = "SavedQueries"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), ForeignKey("Users.account_id"))
    article_link = db.Column(db.Text, unique=True, nullable=False)


db.create_all()
