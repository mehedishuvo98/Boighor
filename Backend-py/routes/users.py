from flask import Blueprint, jsonify
from models.database import get_connection

users = Blueprint("users", __name__)


# =====================================
# Get User By Email
# =====================================

@users.route("/user/<email>")
def get_user(email):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(

        """
        SELECT id, name, email
        FROM users
        WHERE email=%s
        """,

        (email,)

    )

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:

        return jsonify(user)

    return jsonify({

        "message": "User Not Found"

    }),404


# =====================================
# User Reviews
# =====================================

@users.route("/user-reviews/<email>")
def user_reviews(email):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(

        """
        SELECT

            reviews.id,
            reviews.rating,
            reviews.comment,
            books.title AS book_title

        FROM reviews

        JOIN books

        ON reviews.book_id = books.id

        WHERE reviews.email=%s

        ORDER BY reviews.id DESC

        """,

        (email,)

    )

    reviews = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(reviews)