# route.py (auth app)

from flask import Blueprint, make_response, jsonify, request, url_for
from model import Auth, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user
from datetime import datetime
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer

auth_blueprint = Blueprint('auth_api_routes', __name__, url_prefix='/api/user')


@auth_blueprint.route('/all', methods=['GET'])
def getAllUser():
    try:
        all_users = Auth.query.all()
        result = [user.serialize() for user in all_users]
        response = {
            "message": "fetching all user details!",
            "result": result
        }
        status = 200
        return make_response(jsonify(response), status)
    except Exception as e:
        print(str(e))
        status = 401
        response = {
            "message": "Something went wrong!"
        }
        return make_response(jsonify(response), status)


@auth_blueprint.route('/create', methods=['POST'])
def create_user():
    try:
        user = Auth()
        # print(user)
        data = request.get_json()  # Get JSON data instead of form data
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        print(username, email, password)
        if not username or not email or not password:
            status = 400
            response = {
                "message": 'Missing Fields',
            }
            return make_response(jsonify(response), status)

        user.username = username
        user.email = email
        user.password = generate_password_hash(password, method='scrypt')
        user.is_auth = True
        user.created_date = datetime.now()

        db.session.add(user)
        db.session.commit()

        response = {
            "message": 'User Created!',
            "result": user.serialize()
        }
        status = 200

    except Exception as e:
        print(str(e))
        response = {
            "message": "Something went wrong!",
        }
        status = 500
    return make_response(jsonify(response), status)


@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        response = {'message': 'Username or password missing'}
        return make_response(jsonify(response), 400)

    user = Auth.query.filter_by(username=username).first()
    # print(password, user.password)
    if not user:
        response = {'message': 'User not found!'}
        return make_response(jsonify(response), 401)
    # print(check_password_hash(user.password.to, password))
    if check_password_hash(user.password, password):
        user.update_api_key()
        db.session.commit()
        login_user(user)
        user.authenticated = True
        response = {
            'message': f'{user.username} logged in',
            'api_key': user.api_key,
            'authenticated': user.authenticated
        }
        return make_response(jsonify(response), 200)

    response = {'message': 'Access Denied!'}
    return make_response(jsonify(response), 401)


@auth_blueprint.route('/fetch/<username>', methods=['GET'])
def get_User(username):
    try:
        user = Auth.query.filter_by(username=username).first()
        print(user.serialize())
        response = {
            "result": user.serialize()
        }
        status = 200
        return make_response(jsonify(response), status)
    except Exception as e:
        print(str(e))
        response = {
            "message": f"No user called {username} is found!"
        }
        status = 401
        return make_response(jsonify(response), status)


@auth_blueprint.route('<username>/exists', methods=['GET'])
def user_exists(username):
    user = Auth.query.filter_by(username=username).first()
    if user:
        response = {
            "results": True
        }
        status = 200
        return make_response(jsonify(response), status)
    else:
        response = {
            "results": False
        }
        status = 401
        return make_response(jsonify(response), status)


@auth_blueprint.route('/', methods=['GET'])
def get_current_user():
    if current_user.is_authenticated:
        return make_response(jsonify({'result': current_user.serialize()}), 200)
    else:
        return make_response(jsonify({'message': "User not logged in"}), 401)


@auth_blueprint.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get("email")

    user = Auth.query.filter_by(email=email).first()
    if not user:
        return make_response(jsonify({"message": "User not found!"}), 404)

    return make_response(jsonify({"message": "User verified!"}), 200)


@auth_blueprint.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("new_password")

    user = Auth.query.filter_by(email=email).first()
    if not user:
        return make_response(jsonify({"message": "User not found!"}), 404)

    user.password = generate_password_hash(new_password, method='scrypt')
    db.session.commit()

    return make_response(jsonify({"message": "Password reset successful!"}), 200)
