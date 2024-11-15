from flask import Blueprint, jsonify
from app import connect_db

routes = Blueprint('routes', __name__)

@routes.route("/")
def default():
    return jsonify("Welcome to the Flask API")


@routes.route("/users", methods=["GET"])
def get_users():
    cursor = connect_db().cursor()
    cursor.execute("SELECT * FROM c_user")
    users = cursor.fetchall()
    cursor.close()
    return jsonify(users)