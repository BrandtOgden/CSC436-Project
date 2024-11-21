from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import create_access_token
from . import connect_db, bcrypt

auth = Blueprint('auth', __name__)

@auth.errorhandler(400)
def handle_bad_request(error):
    """
    Handles 400 HTTP Error - Bad Request
    Used for when there is something wrong with the format of the JSON from the frontend
    """
    return jsonify({'error': 'Bad Request', 'message': error.description}), 400

@auth.errorhandler(401)
def handle_unauthorized_user(error):
    """
    Handles 401 HTTP Error - Unauthorized
    Used for when the user provided credentials don't match anything in the database
    """
    return jsonify({'error': 'Unauthorized', 'message': error.description}), 401


@auth.route('/signup', methods=['POST'])
def signup():
    """
    Creates new user in database
    Return HTTP Codes:
        200: Signup Success
        400: Bad Request - there's something wrong with the request from the frontend
        500: Internal Server Error - Some logic within this function is wrong (most likely a SQL/database error)
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

    print(username)

    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    cursor = connect_db().cursor()

    try:
        cursor.execute("INSERT INTO c_user (u_name, pronouns, ability, date_of_birth, password_hash) \
                    VALUES (%s, %s, %s, %s, %s)", (username, pronouns, ability, dob, password_hash))
        cursor._connection.commit()

        # Get the id from the newly created user
        user_id = cursor.lastrowid

        # Now generate JWT
        # FIXME: Going to want to make this username and make username the primary key of the table
        token = create_access_token(identity=user_id)
        return jsonify({"jwt": token}), 200
    except Exception as e:
        abort(500, description=f"Database Error: {e}")


@auth.route('/login', methods=['POST'])
def login():
    """
    Checks if user is in database
    Return HTTP Codes:
        200: Login Success
        400: Bad Request - there's something wrong with the request from the frontend
        401: Unauthorized - Invalid user credentials
        500: Internal Server Error - Some logic within this function is wrong (most likely a SQL/database error)
    """
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        abort(400, description="username and password are required")

    username = data.get('username')
    password = data.get('password')

    cursor = connect_db().cursor()
    cursor.execute("SELECT id, password_hash FROM c_user WHERE u_name = %s", (username,))
    db_response = cursor.fetchone()
    cursor.close()

    if db_response is None:
        abort(401, description="Invalid username")

    user_id = db_response[0]
    password_hash = db_response[1]

    if bcrypt.check_password_hash(password_hash, password):
        token = create_access_token(identity=user_id)
        return jsonify({"jwt": token}), 200
        
    abort(401, description="Invalid password")
