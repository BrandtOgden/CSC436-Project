import mysql.connector
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

def connect_db():
    """
    Connects to the MySQL database using environment variables.
    """
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )
        print("Database connection successful.")
        return connection
    except mysql.connector.Error as e:
        print(f"Error connecting to database: {e}")
        exit(1)

def update_post_images():
    """
    Updates the posts table with image URLs.
    """
    image_urls = {
        1: "https://plus.unsplash.com/premium_photo-1672281090336-13b2831a1394?w=800&auto=format&fit=crop&q=60",
        2: "https://images.unsplash.com/photo-1610769185248-fa41300a2118?w=800&auto=format&fit=crop&q=60",
        3: "https://plus.unsplash.com/premium_photo-1661875231792-462b05b85714?w=800&auto=format&fit=crop&q=60",
        4: "https://images.unsplash.com/photo-1529861820-012514cbd6d5?w=800&auto=format&fit=crop&q=60",
        5: "https://images.unsplash.com/photo-1516372048654-2e06f99e1382?w=800&auto=format&fit=crop&q=60",
        6: "https://images.unsplash.com/photo-1501450626433-39bbf117090e?w=800&auto=format&fit=crop&q=60",
        7: "https://plus.unsplash.com/premium_photo-1683850223449-4372b75c8771?w=800&auto=format&fit=crop&q=60",
        8: "https://images.unsplash.com/photo-1560270552-d7ea3b9269d1?w=800&auto=format&fit=crop&q=60",
        9: "https://plus.unsplash.com/premium_photo-1661963229272-1a5ab149c1db?w=800&auto=format&fit=crop&q=60",
        10: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format&fit=crop&q=60",
    }

    connection = connect_db()
    cursor = connection.cursor()

    try:
        for post_id, image_url in image_urls.items():
            query = "UPDATE post SET image_url = %s WHERE id = %s"
            cursor.execute(query, (image_url, post_id))
            print(f"Updated post_id {post_id} with image_url {image_url}")

        connection.commit()
        print("All image URLs updated successfully.")
    except mysql.connector.Error as e:
        print(f"Error updating image URLs: {e}")
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    update_post_images()
