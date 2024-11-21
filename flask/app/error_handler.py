from flask import jsonify
from . import auth, routes

@auth.errorhandler(400)
@routes.errorhandler(400)
def handle_bad_request(error):
    """
    Handles 400 HTTP Error - Bad Request
    """
    return jsonify({'message': error.description}), 400


@auth.errorhandler(401)
@routes.errorhandler(401)
def handle_unauthorized_user(error):
    """
    Handles 401 HTTP Error - Unauthorized Access
    """
    return jsonify({'message': error.description}), 401


@auth.errorhandler(500)
@routes.errorhandler(500)
def handle_internal_error(error):
    """
    Handles HTTP Error 500 - Internal Server Error
    """
    return jsonify({'message': error.description}), 500