from flask import Flask
from flask_migrate import Migrate
from route import message_blueprint
import model
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app: Flask = Flask(__name__)
app.config['SECRET_KEY'] = 'Clze1OdYoCsHPoxlKH2Vew'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "database", "message.db")}'

app.register_blueprint(message_blueprint)
migrate: Migrate = Migrate()

model.init_app(app)
migrate.init_app(app, model.db)

if __name__ == "__main__":
    app.run(debug=True, port=5002)
