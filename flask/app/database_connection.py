from flask import current_app, abort, g
import mysql.connector
import os

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


def disconnect_db(error=None):
    """
    Closes the connect after the current API call is finished
    """
    db = g.pop('db', None)
    if db is not None:
        current_app.logger.info("Disconnecting from AWS MySQL database")
        db.close()
