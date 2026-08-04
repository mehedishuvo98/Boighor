from flask import Blueprint, jsonify
from models.database import get_connection

books = Blueprint("books", __name__)


# =====================================
# Get All Books
# =====================================

@books.route("/books")
def get_books():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM books")

    books = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(books)


# =====================================
# Get Single Book
# =====================================

@books.route("/book/<int:id>")
def get_book(id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(

        """
        SELECT *
        FROM books
        WHERE id=%s
        """,

        (id,)

    )

    book = cursor.fetchone()

    cursor.close()
    connection.close()

    if book:

        return jsonify(book)

    return jsonify({

        "message": "Book Not Found"

    }),404