from app_config import application
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(application)


class SavedQueries(db.Model):
    __tablename__ = "SavedQueries"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Text, unique=False, nullable=False)
    saved_query = db.Column(db.String(100), unique=True, nullable=False)


class SavedArticles(db.Model):
    __tablename__ = "SavedArticles"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Text, unique=False, nullable=False)
    url = db.Column(db.Text, unique=True, nullable=False)
    title = db.Column(db.Text, unique=False, nullable=True)
    description = db.Column(db.Text, unique=False, nullable=True)
    image = db.Column(db.Text, unique=False, nullable=True)
    author = db.Column(db.Text, unique=False, nullable=True)
    published_at = db.Column(db.Text, unique=False, nullable=True)


class ViewedArticles(db.Model):
    __tablename__ = "ViewedArticles"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Text, unique=False, nullable=False)
    url = db.Column(db.Text, unique=True, nullable=False)
    title = db.Column(db.Text, unique=False, nullable=True)
    description = db.Column(db.Text, unique=False, nullable=True)
    image = db.Column(db.Text, unique=False, nullable=True)
    author = db.Column(db.Text, unique=False, nullable=True)
    published_at = db.Column(db.Text, unique=False, nullable=True)


with application.app_context():  # fixes potential database error: "RuntimeError: Working outside of application context."
    # db.drop_all()
    db.create_all()
