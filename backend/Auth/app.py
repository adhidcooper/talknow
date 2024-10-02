import os

from flask import Flask, g
from flask.sessions import SecureCookieSessionInterface
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_cors import CORS

import model
from route import auth_blueprint

basedir = os.path.abspath(os.path.dirname(__file__))

app: Flask = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'wPk4epct1fRJuYwvMlEwGQ'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "database", "auth.db")}'

app.register_blueprint(auth_blueprint)
model.init_app(app)
migrate = Migrate(app, model.db)

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(id):
    return model.Auth.query.filter_by(id=id).first()


@login_manager.request_loader
def load_user_from_request(request):
    api_key = request.headers.get('Authorization')
    if api_key:
        api_key = api_key.replace('Basic', '', 1)
        user = model.Auth.query.filter_by(api_key=api_key).first()
        if user:
            return user
    return None


class CustomSessionInterface(SecureCookieSessionInterface):
    """Prevent creating session from API requests."""

    def save_session(self, *args, **kwargs):
        if g.get('login_via_header'):
            return
        return super(CustomSessionInterface, self).save_session(*args, **kwargs)


if __name__ == "__main__":
    app.run(host='0.0.0.0',  port=5001)
