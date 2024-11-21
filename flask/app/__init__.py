from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from .config import Config
from .error_handler import register_error_handlers
from .database_connection import disconnect_db
from .routes import routes
from .auth import auth

def create_app():
    """
    Initial setup for Flask app. Uses CORS to allow React and Flask to be on different domains
    Gets configuration from config.py
    Registers `auth` and `routes` routes 
    Registers error handlers for all routes
    """
    app = Flask(__name__)

    app.config.from_object(Config)
    app.teardown_appcontext(disconnect_db)

    CORS(app) # FIXME: Make this better in production
    JWTManager(app)
    bcrypt = Bcrypt(app)
    app.bcrypt = bcrypt

    app.register_blueprint(auth)
    app.register_blueprint(routes)

    register_error_handlers(app)

    return app