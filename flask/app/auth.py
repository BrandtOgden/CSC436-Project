from flask import Blueprint, request, jsonify, abort, current_app
from flask_jwt_extended import create_access_token
from .database_connection import connect_db 
from datetime import timedelta

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['POST'])
def signup():
    """
    Creates new user in database
    Returns 409 if the username provided is already in the database
    """
    data = request.get_json()

    val_list = ['username', 'password', 'pronouns', 'ability', 'dob']
    if not data:
        abort(400, description=f"No body. Variables required: {val_list}")

    for key in val_list:
        if key not in data:
            abort(400, description=f"Variables required: {val_list}")

    username = data.get('username')
    password = data.get('password')
    pronouns = data.get('pronouns')
    ability = data.get('ability')
    dob = data.get('dob')

    # Make sure user is unique
    cursor = connect_db().cursor()
    cursor.execute("SELECT * FROM c_user WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user:
        abort(409, description="Username already exists")

    password_hash = current_app.bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        cursor = connect_db().cursor()
        cursor.execute(
            "INSERT INTO c_user (username, pronouns, ability, date_of_birth, password_hash) \
            VALUES (%s, %s, %s, %s, %s)",
            (username, pronouns, ability, dob, password_hash)
        )
        cursor._connection.commit()

        # Get the ID of the newly created user
        user_id = cursor.lastrowid
        cursor.close()

        # Now generate JWT, valid for 1 hour
        token = create_access_token(identity=user_id, expires_delta=timedelta(hours=1))
        return jsonify({"jwt": token}), 201
    except Exception as e:
        abort(500, description=f"Database Error: {e}")


@auth.route('/login', methods=['POST'])
def login():
    """
    Checks if user is in database and returns the JWT to be used for session if they are
    """
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        abort(400, description="Username and password are required")

    username = data.get('username')
    password = data.get('password')
       
    cursor = connect_db().cursor(dictionary=True)
    cursor.execute("SELECT id, password_hash FROM c_user WHERE username = %s", (username,))
    db_response = cursor.fetchone()
    cursor.close()

    if not db_response:
        abort(401, description="Invalid username")

    user_id = db_response['id']
    password_hash = db_response['password_hash']

    if current_app.bcrypt.check_password_hash(password_hash, password):
        token = create_access_token(identity=user_id, expires_delta=timedelta(hours=1))
        return jsonify({"jwt": token}), 200
    else:
        abort(401, description="Invalid password")
