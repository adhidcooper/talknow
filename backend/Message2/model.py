from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()


def init_app(app):
    db.app = app
    db.init_app(app)


class Channel(db.Model):
    __tablename__ = 'channel'
    c_id = db.Column(db.String(255), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False)
    channel_name = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.DateTime)
    created_by = db.Column(db.String(255))
    channel_open = db.Column(db.Boolean, default=False)

    # Relationships
    members = db.relationship("Members", backref='channel', lazy=True)
    messages = db.relationship("Message", backref='channel', lazy=True)

    def __repr__(self):
        return f"<Channel {self.c_id}, \n{self.channel_name}, \n[{self.created_date}, {self.created_by}]"

    def serialize(self):
        response = {
            "c_id": self.c_id,
            "channel_name": self.channel_name,
            "created_date": self.created_date,
            "created_by": self.created_by
        }
        return response


class Members(db.Model):
    __tablename__ = 'members'
    m_id = db.Column(db.String(255), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False)
    user_id = db.Column(db.String(255))
    channel_id = db.Column(db.String(255), db.ForeignKey('channel.c_id'), nullable=False)

    def __repr__(self):
        return f"<Inbox {self.m_id}, {self.user_id}, {self.channel_id}"

    def serialize(self):
        response = {
            'm_id': self.m_id,
            'user_id': self.user_id,
            'channel_id': self.channel_id
        }
        return response


class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.String(255), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False)
    channel_id = db.Column(db.String(255), db.ForeignKey('channel.c_id'),
                           nullable=False)
    user_id = db.Column(db.String(255))
    content = db.Column(db.String(255))
    created_time = db.Column(db.DateTime)

    def __repr__(self):
        return f"<Message {self.inbox_uid}, {self.user_id}, {self.created_time}"

    def serialize(self):
        response = {
            "id": self.id,
            "channel_id": self.channel_id,
            "user_id": self.user_id,
            "message": self.content,
            "created_date": self.created_time
        }
        return response
