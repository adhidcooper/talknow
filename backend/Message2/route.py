from flask import Blueprint, jsonify, make_response, request
import requests
from model import Channel, Members, Message, db
from datetime import datetime


message_blueprint = Blueprint("message_blueprint", __name__, url_prefix="/api/message")

USER_API_URL = 'http://127.0.0.1:5001/api/user'


def get_user(api_key):
    headers = {
        'Authorization': api_key
    }
    response = requests.get(USER_API_URL, headers=headers)
    if response.status_code != 200:
        return {
            "message": 'Not Authorized!'
        }
    user = response.json()
    return user


@message_blueprint.route('/', methods=['GET'])
def message_get():
    api_key = request.headers.get("Authorization")

    if not api_key:
        response = {
            "message": "Not Logged In"
        }
        return make_response(jsonify(response), 401)
    response = get_user(api_key)

    user = response.get('result')
    if not user:
        return make_response(jsonify({
            "message": "Not Logged In"
        }), 401)

    user_members = Members.query.filter_by(user_id=user['id']).first()

    print(user_members)
    if user_members:
        status = 200
        response = {
            "message": "members!",
            "result": user_members.serialize()
        }
    else:
        status = 401
        response = {
                "result": "Not Channels so far!"
        }
    return make_response(jsonify(response), status)


@message_blueprint.route('/create_channel', methods=['POST'])
def create_channel():
    api_key = request.headers.get("Authorization")
    print(api_key)
    if not api_key:
        response = {
            "message": "Not Logged In"
        }
        return make_response(jsonify(response), 401)
    response = get_user(api_key)

    user = response.get('result')
    if not user:
        return make_response(jsonify({
            "message": "Not Logged In"
        }), 401)

    try:
        channel = Channel()
        channel_name = request.form['channel_name']
        channel.created_date = datetime.now()
        channel.created_by = user['username']
        channel.channel_open = True
        channel.channel_name = channel_name
        db.session.add(channel)
        db.session.commit()
        
        members = Members()
        members.user_id = user['id']
        members.channel_id = channel.c_id
        
        db.session.add(members)
        db.session.commit()
        
        status = 200
        response = {
            "message": "New Channel is Created Successfully!",
            "created_user": members.user_id,
            "result": channel.serialize(),
        }

    except Exception as e:
        print(str(e))
        status = 401
        response = {
            "message": "Something went Wrong!"
        }
    return make_response(jsonify(response), status)

@message_blueprint.route('/get_channels', methods=['GET'])
def getUserChannel():
    api_key = request.headers.get("Authorization")
    if not api_key:
        response = {
            "message": "Not Logged In"
        }
        return make_response(jsonify(response), 401)
    response = get_user(api_key)

    user = response.get('result')
    if not user:
        return make_response(jsonify({
            "message": "Not Logged In"
        }), 401)
    user_Channels = Channel.query.all()
    result = [channels.serialize() for channels in user_Channels]
    response = {
        "user_id": user['id'],
        "is_auth": user['is_auth'],
        "result": result
    }
    return make_response(jsonify(response), 200)

@message_blueprint.route('/send_message', methods=['POST'])
def send_message():
    api_key = request.headers.get("Authorization")
    if not api_key:
        response = {
            "message": "Not Logged In"
        }
        return make_response(jsonify(response), 401)
    response = get_user(api_key)

    user = response.get('result')
    if not user:
        return make_response(jsonify({
            "message": "Not Logged In"
        }), 401)

    try:
        channel_id = request.form['channel_id']
        content = request.form['content']

        member = Members.query.filter_by(user_id=user['id'], channel_id=channel_id).first()
        if not member:
            response = {
                "message": "user not a member of this channel!"
            }
            return make_response(jsonify(response), 404)

        #Sending a message!
        new_message = Message()
        new_message.content = content
        new_message.user_id = user['id']
        new_message.channel_id = channel_id
        new_message.created_time = datetime.now()

        db.session.add(new_message)
        db.session.commit()
        status = 200
        response = {
            "message": "Message is sent Successfully",
            "result": new_message.serialize()
        }

    except Exception as e:
        status = 500
        response = {
            "message": "An Error Occurred while sending the message!",
            "error": f"{str(e)}"
        }
    return make_response(jsonify(response), status)


