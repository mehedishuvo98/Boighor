from flask import Blueprint, jsonify, request
from models.database import get_connection

reviews = Blueprint("reviews", __name__)

# =====================================
# Get Reviews By Book ID
# =====================================

@reviews.route("/reviews/<int:book_id>")
def get_reviews(book_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(

        """
        SELECT *
        FROM reviews
        WHERE book_id=%s
        ORDER BY id DESC
        """,

        (book_id,)

    )

    data = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(data)


# =====================================
# Add Review
# =====================================

@reviews.route("/reviews", methods=["POST"])
def add_review():

    try:

        data = request.get_json()

        reviewer = data["reviewer"]
        email = data["email"]
        rating = data["rating"]
        comment = data["comment"]
        book_id = data["book_id"]

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(

            """
            INSERT INTO reviews
            (book_id, reviewer, email, rating, comment)
            VALUES(%s,%s,%s,%s,%s)
            """,

            (
                book_id,
                reviewer,
                email,
                rating,
                comment
            )

        )

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({

            "success": True,
            "message": "Review Added Successfully"

        })

    except Exception as e:

        return jsonify({

            "success": False,
            "message": str(e)

        }),500


# =====================================
# Latest Reviews
# =====================================

@reviews.route("/latest-reviews")
def latest_reviews():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(

        """
        SELECT

            reviews.id,
            reviews.reviewer,
            reviews.rating,
            reviews.comment,
            books.title

        FROM reviews

        JOIN books

        ON reviews.book_id=books.id

        ORDER BY reviews.id DESC

        LIMIT 3
        """

    )

    data = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(data)