import uuid
from datetime import datetime

from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

db = SQLAlchemy()


def init_app(app):
    db.app = app
    db.init_app(app)


class Auth(db.Model, UserMixin):
    id = db.Column(db.String(255), primary_key=True,
                   default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    firstName = db.Column(db.String(255), nullable=True)
    lastName = db.Column(db.String(255), nullable=True)
    phoneNumber = db.Column(db.String(255), nullable=True)
    imageUrl = db.Column(db.String(255), nullable=True)
    created_date = db.Column(db.DateTime)
    api_key = db.Column(db.String(255), unique=True, nullable=True)
    is_active = db.Column(db.Boolean, default=False)
    authenticated = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Auth {self.id} {self.username}'

    def serialize(self):
        response = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'phoneNumber': self.phoneNumber,
            'imageUrl': self.imageUrl,
            'created_date': self.created_date,
            'api_key': self.api_key,
            'is_active': self.is_active,
            'is_auth': self.is_authenticated
        }
        return response

    def update_api_key(self):
        self.api_key = generate_password_hash(
            self.username + str(datetime.now()), method='scrypt', salt_length=4)
