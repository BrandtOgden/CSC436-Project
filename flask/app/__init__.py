from flask import Flask, g, abort
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import mysql.connector
import os
from .config import Config


def connect_db():
    """
    Connects to an arbitrary database using credentials found in .env file
    This connects to the database only for the current API call to adhere to REST
    Times out after 10 seconds so I don't forget that 
    Return:
        Either database connection object or aborts with HTTP return code 500
    """
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
        except mysql.connector.Error as e:
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
        db.close()


bcrypt = Bcrypt()
def create_app():
    """
    Initial setup for Flask app. Uses CORS to allow React and Flask to be on different domains
    Registers routes defined in routes.py
    """
    app = Flask('Climbing App API')

    app.config.from_object(Config)
    app.teardown_appcontext(disconnect_db)

    CORS(app) # Make this better in production
    bcrypt.init_app(app)
    jwt = JWTManager(app)

    from .routes import routes
    from .auth import auth
    from .routes import routes
    app.register_blueprint(auth)
    app.register_blueprint(routes)
    

    return app