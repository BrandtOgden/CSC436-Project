from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import connect_db

routes = Blueprint('routes', __name__)

@routes.route('/')
def default():
    """
    Just a default route to to test connection to API
    """
    return jsonify("Welcome to the Flask API")


@routes.route('/users', methods=['GET'])
def get_users():
    """
    Returns all users in the database
    """
    cursor = connect_db().cursor()
    cursor.execute("SELECT * FROM c_user")
    users = cursor.fetchall()
    cursor.close()
    return jsonify(users)


@routes.route('/posts', methods=['GET'])
@jwt_required(optional=True)
def get_posts():
    """
    Returns 10 most recent posts
    TODO: Could possibly do some custom recommendation
    """
    cursor = connect_db().cursor(dictionary=True)
    cursor.execute('SELECT * FROM recent_posts') 
    posts = cursor.fetchall()
    cursor.close()
    return jsonify(posts), 200