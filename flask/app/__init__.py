from flask import Flask, g
from flask_cors import CORS
from dotenv import load_dotenv
import mysql.connector
import os

# Get environment variables from .env
load_dotenv()

def connect_db():
    """
    Connects to an arbitrary database using credentials found in .env file
    This connects to the database only for the current API call to adhere to REST
    """
    if 'db' not in g:
        try:
            connection = mysql.connector.connect(
                host=os.getenv('DB_HOST'),
                user=os.getenv('DB_USER'),
                password=os.getenv('DB_PASSWORD'),
                database=os.getenv('DB_NAME')
            )
        except mysql.connector.Error as e:
            print(f"Error connecting to database: {e}")
            raise

        if not connection.is_connected():
            raise RuntimeError("Couldn't connect to database")

        g.db = connection
    return g.db    


def disconnect_db(exception=None):
    """
    Closes the connect after the current API call is finished
    """
    db = g.pop('db', None)
    if db is not None:
        db.close()


def create_app():
    """
    Initial setup for Flask app. Uses CORS to allow React and Flask to be on different domains
    Registers routes defined in routes.py
    """
    app = Flask(__name__)
    CORS(app)

    app.teardown_appcontext(disconnect_db)

    # Import and register blueprints
    from .routes import routes
    app.register_blueprint(routes)

    return app