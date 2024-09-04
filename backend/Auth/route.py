from flask import Blueprint, make_response, jsonify, request
from model import Auth, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user
from datetime import datetime

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
        user.username = request.form['username']
        user.email = request.form['email']
        user.password = generate_password_hash(request.form['password'], method='pbkdf2:sha256')
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
        status = 401
    return make_response(jsonify(response), status)


@auth_blueprint.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    user = Auth.query.filter_by(username=username).first()
    if not user:
        response = {
            'message': 'User not found!'
        }
        status = 401
        make_response(jsonify(response), status)
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
        status = 200
        return make_response(jsonify(response), status)

    response = {
        'message': 'Access Denied!',
    }
    status = 401
    return make_response(jsonify(response), status)


@auth_blueprint.route('/logout', methods=['POST'])
def logout():
    # print("the current User "+ current_user.is_authenticated)
    if current_user.is_authenticated:
        logout_user()
        # print(current_user)
        status = 200
        current_user.is_auth = False
        response = {
            "message": "User Logged Out!"
        }
        return make_response(jsonify(response), status)
    status = 401
    response = {
        "message": "No User Logged In!"
    }
    return make_response(jsonify(response), status)


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