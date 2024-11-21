from flask import Blueprint, jsonify
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
def get_posts():
    """
    Returns 10 most recent posts 
    """
    cursor = connect_db().cursor()
    query = '\
        SELECT * \
        FROM post \
        ORDER BY date_created \
        LIMIT 10'
    cursor.execute(query) 
    posts = cursor.fetchall(dict)
    cursor.closer()
    return jsonify(posts)