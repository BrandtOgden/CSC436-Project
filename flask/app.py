from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

# Load database credentials from .env
load_dotenv("aws_rds.env")

@app.route("/test")
def fetch_data():
    connection = None
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )

        if connection.is_connected():
            cursor = connection.cursor()

            query = "SELECT * FROM c_user"
            cursor.execute(query)
            results = cursor.fetchall()

            for row in results:
                print(row)

            return jsonify(results)

    except mysql.connector.Error as e:
        print(f"Error: {e}")
    finally:
        if connection != None and connection.is_connected():
            connection.close()

@app.route("/")
def home():
    return jsonify({"message": "I love you Grace"})



def main():
    fetch_data()

if __name__ == "__main__":
    # main()
    app.run(debug=True)