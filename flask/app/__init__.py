from flask import Flask, current_app, g, abort
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import mysql.connector
import os
from .config import Config
from .error_handler import register_error_handlers

def connect_db():
    """
    Connects to an arbitrary database using credentials found in .env file
    This connects to the database only for the current API call to adhere to REST
    Times out after 10 seconds so I don't forget that 
    Return:
        Either database connection object or aborts with HTTP return code 500
    """
    current_app.logger.info("Connecting to AWS MySQL database")
    if 'db' not in g:
        connection = None
        try:
            connection = mysql.connector.connect(
                host=os.getenv('DB_HOST'),
                user=os.getenv('DB_USER'),
                password=os.getenv('DB_PASSWORD'),
                database=os.getenv('DB_NAME'),
                connect_timeout=10
            )
            current_app.logger.info("Connected to AWS MySQL database")
        except mysql.connector.Error as e:
            current_app.logger.info(f"Error connecting to AWS MySQL database: {e}")
            print(e)
            abort(500, description=f"Error connecting to AWS MySQL database: {e}")

        g.db = connection
    return g.db    


def disconnect_db(exception=None):
    """
    Closes the connect after the current API call is finished
    """
    db = g.pop('db', None)
    if db is not None:
        current_app.logger.info("Disconnecting from AWS MySQL database")
        db.close()


def create_app():
    """
    Initial setup for Flask app. Uses CORS to allow React and Flask to be on different domains
    Registers routes defined in routes.py
    """
    # These are global variables that are needed elsewhere
    # FIXME: Not sure if this needs to be global
    global bcrypt

    app = Flask(__name__)

    app.config.from_object(Config)
    app.teardown_appcontext(disconnect_db)

    CORS(app) # FIXME: Make this better in production
    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)

    from .routes import routes
    from .auth import auth
    app.register_blueprint(auth)
    app.register_blueprint(routes)

    register_error_handlers(app)

    return app