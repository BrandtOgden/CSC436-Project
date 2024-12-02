from flask import Blueprint, jsonify, request, abort, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from .database_connection import connect_db

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
def posts():
    """
    Returns 10 most recent posts using recent_posts view
    """
    cursor = connect_db().cursor(dictionary=True)
    cursor.execute('SELECT * FROM recent_posts') 
    posts = cursor.fetchall()
    cursor.close()
    return jsonify(posts), 200


@routes.route('/friends', methods=['GET', 'POST', 'DELETE'])
@jwt_required()
def friends():
    """
    Uses JWT to manage friends for current user
    'GET': Returns a list of the user's current friends
        Returns 204 if the user doesn't have any friends
    'POST': Adds specified friend by username
    'DELETE': Deletes specified friend by username
    """
    user_id = get_jwt_identity()
    cursor = connect_db().cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute('SELECT username, date_accepted FROM get_friends WHERE requested_id = %s', (user_id,))
        friends = cursor.fetchall()
        cursor.close()

        if not friends:
            return '', 204

        return jsonify(friends), 200

    elif request.method == 'POST' or request.method == 'DELETE':
        data = request.get_json()

        if not data or 'username' not in data:
            cursor.close()
            current_app.logger.error("username is missing from the request payload.")
            abort(401, description="username required")

        username = data['username']

        # Fetch the friend's user ID by username
        cursor.execute("SELECT id FROM c_user WHERE username = %s", (username,))
        friend = cursor.fetchone()

        if not friend:
            cursor.close()
            current_app.logger.error(f"No user found with username: {username}")
            abort(404, description="User not found")

        friend_id = friend['id']

        if request.method == 'POST':
            # Check if already friends
            cursor.execute('SELECT * FROM friend WHERE requested_id = %s AND accepted_id = %s', (user_id, friend_id))
            response = cursor.fetchone()
            if response:
                cursor.close()
                abort(409, description="Friend already exists")

            # Add friend relationship
            cursor.execute('INSERT INTO friend (requested_id, accepted_id) VALUES (%s, %s)', (user_id, friend_id))
            cursor._connection.commit()
            cursor.close()

            return jsonify({"success": f"Friend '{username}' added successfully"}), 201

        elif request.method == 'DELETE':
            # Delete friend relationship
            cursor.execute('DELETE FROM friend WHERE requested_id = %s AND accepted_id = %s', (user_id, friend_id))
            cursor._connection.commit()
            cursor.close()

            return jsonify({"success": f"Friend '{username}' removed successfully"}), 200

    cursor.close()
    abort(500, description="routes.py friends() should never get here")


@routes.route('/current_user', methods=['GET'])
@jwt_required()
def current_user():
    try:
        user_id = get_jwt_identity()
        current_app.logger.info(f"Decoded User ID (as string): {user_id}")  # Use current_app

        cursor = connect_db().cursor(dictionary=True)
        cursor.execute("SELECT username FROM c_user WHERE id = %s", (int(user_id),))  # Convert to int for DB query
        user = cursor.fetchone()
        cursor.close()

        if not user:
            current_app.logger.error(f"No user found with ID: {user_id}")
            return jsonify({"error": "User not found"}), 404

        current_app.logger.info(f"Retrieved User: {user}")
        return jsonify(user), 200
    except Exception as e:
        current_app.logger.error(f"Error in /current_user: {e}")
        return jsonify({"error": "Invalid token or server issue"}), 422


@routes.route('/profile', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def profile():
    """
    Uses JWT to manage the profile settings for the user
    'GET': Returns all information about the user
    'PUT': Updates specified profile settings
        Must specify one or more valid settings to update
    'DELETE': Deletes the user from the database
    """
    user_id = get_jwt_identity()
    cursor = connect_db().cursor(dictionary=True)

    if request.method == 'GET':
        cursor.execute('SELECT username, pronouns, ability, date_of_birth, created_at FROM c_user \
                       WHERE id = %s', (user_id,))
        profile = cursor.fetchall()
        cursor.close()

        if not profile:
            abort(500, description="Profile not found (should never happen)")

        return jsonify(profile), 200
    elif request.method == 'PUT':
        data = request.get_json()
        settings = ['username', 'pronouns', 'ability', 'date_of_birth']

        if not data:
            cursor.close()
            abort(400, description=f"No body. Use one or more of the following variables: {settings}")

        for key in data.keys():
            if key not in settings:
                cursor.close()
                abort(400, description=f"Invalid setting. Use one or more of the following variables: {settings}")

        for key, val in data.items():
            current_app.logger.info(f'Updating {key} to {val}')
            cursor.execute(f'UPDATE c_user SET {key} = %s WHERE id = %s', (val, user_id))
            cursor._connection.commit()
        cursor.close()

        return '', 204
    elif request.method == 'DELETE':
        cursor.execute('DELETE FROM c_user WHERE id = %s', (user_id,))
        cursor._connection.commit()
        cursor.close()

        return '', 204

    cursor.close()
    abort(500, description="routes.py profile() should never get here")

@routes.route('/climb', methods=['GET', 'POST'])
@jwt_required(optional=True)
def climb():
    """
    Handles climbs based on a user
    'GET': Returns all climbs in the database (JWT not given) or the climbs completed by a user (JWT Given)
        Returns with 404 error if no climbs were found
    'POST': Says that a user has done a climb, adds the climb to the climbed table
    """
    cursor = connect_db().cursor(dictionary=True)

    if request.method == 'GET':
        user_id = get_jwt_identity()

        climbs = None
        if not user_id:
            # Getting all climbs
            cursor.execute('SELECT c_name, c_description, grade, location FROM climb_information')
            climbs = cursor.fetchall()
        else:
            # Getting climbs completed by user
            print(user_id)
            cursor.execute('SELECT * FROM get_climbs WHERE c_user_id = %s', (user_id,))
            climbs = cursor.fetchall()

        cursor.close()

        if not climbs:
            abort(404, description='No climbs found')
        
        return jsonify(climbs)
    elif request.method == 'POST':
        user_id = get_jwt_identity()

        if not user_id:
            cursor.close()
            abort(401, description="JWT is required for POST")

        data = request.get_json()

        if not data or 'climb_information_id' not in data:
            cursor.close()
            abort(400, description="Request must have `climb_information_id`")

        climb_information_id = data['climb_information_id']

        cursor.execute('INSERT INTO climbed (c_user_id, climb_information_id) VALUES (%s, %s)', (user_id, climb_information_id))
        cursor._connection.commit()
        cursor.close()

        return '', 204

    cursor.close()
    abort(500, description="routes.py climb() should never get here")