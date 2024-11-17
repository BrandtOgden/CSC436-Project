import os
from dotenv import load_dotenv
import sys

def check_load_env():
    """
    Check for existence of `.env` and loads environment variables from `.env`
    Ensures that all the necessary variables are defined
    """
    dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")

    if not os.path.exists(dotenv_path):
        print(".env does not exist. Exiting...")
        sys.exit(1)

    load_dotenv(dotenv_path)

    vars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET_KEY']
    for var in vars:
        if os.getenv(var) is None:
            print(f"Environment variable `{var}` not defined. Exiting...")
            sys.exit(1)


check_load_env()


class Config:
    """
    Loads database credentials and JWT key from environment variables
    """
    DB_HOST = os.getenv('DB_HOST'),
    DB_USER = os.getenv('DB_USER'),
    DB_PASSWORD = os.getenv('DB_PASSWORD'),
    DB_NAME = os.getenv('DB_NAME')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')