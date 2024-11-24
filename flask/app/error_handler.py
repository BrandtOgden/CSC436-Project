from flask import jsonify

def register_error_handlers(app):
    @app.errorhandler(400)
    def handle_bad_request(error):
        """
        Handles 400 HTTP Error - Bad Request
        """
        app.logger.error(f"ERROR: 400 (Bad Request): {error.description}")
        return jsonify({'message': error.description}), 400


    @app.errorhandler(401)
    def handle_unauthorized_user(error):
        """
        Handles 401 HTTP Error - Unauthorized Access
        """
        app.logger.error(f"ERROR: 401 (Unauthorized Access): {error.description}")
        return jsonify({'message': error.description}), 401

    @app.errorhandler(409)
    def handle_conflict(error):
        """
        Handles 409 HTTP Error - Conflict
        Used if record to be inserted is already in the database 
        """
        app.logger.error(f"409 (Conflict): {error.description}")
        return jsonify({'message': error.description}), 409

    @app.errorhandler(500)
    def handle_internal_error(error):
        """
        Handles HTTP Error 500 - Internal Server Error
        """
        app.logger.error(f"ERROR: 500 (Internal Server Error): {error.description}")
        return jsonify({'message': error.description}), 500