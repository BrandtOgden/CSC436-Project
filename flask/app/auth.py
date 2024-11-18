from flask import Blueprint, request, jsonify, abort
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
        500: Internal Server Error - Some logic within this function is wrong (most likely a SQL error)
    """
    data = request.get_json()

    val_list = ['username', 'password', 'pronouns', 'ability', 'dob']
    if not data:
        abort(400, description=f"Variables required: {val_list}")

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
    # TODO: Eventually going to want to make sure username is unique or have some way to enforce this
    cursor.execute("INSERT INTO c_user (u_name, pronouns, ability, date_of_birth, password_hash) \
                   VALUES (%s, %s, %s, %s, %s)", (username, pronouns, ability, dob, password_hash))
    cursor._connection.commit()
    cursor.close()

    return jsonify({"message": "Signup Success"})


@auth.route('/login', methods=['POST'])
def login():
    """
    Checks if user is in database
    Return HTTP Codes:
        200: Login Success
        400: Bad Request - there's something wrong with the request from the frontend
        401: Unauthorized - Invalid user credentials
        500: Internal Server Error - Some logic within this function is wrong (most likely a SQL error)
    """
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        abort(400, description="username and password are required")

    username = data.get('username')
    password = data.get('password')

    cursor = connect_db().cursor()
    cursor.execute("SELECT password_hash FROM c_user WHERE u_name = %s", (username,))
    user = cursor.fetchone()
    cursor.close()

    if user:
        if bcrypt.check_password_hash(user[0], password):
            return jsonify({"message": "Login Success"})
        
    abort(401, description="Invalid username or password")
