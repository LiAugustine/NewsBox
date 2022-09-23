from app import app
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy(app)


class User(db.Model, UserMixin):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    picture = db.Column(db.Text, unique=False, nullable=True)
    account_id = db.Column(db.String(100), unique=True, nullable=False)


db.create_all()
