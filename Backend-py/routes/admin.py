from flask import Blueprint, jsonify, request
from models.database import get_connection

admin = Blueprint("admin", __name__)

# =====================================
# Admin - Add Book
# =====================================

@admin.route("/admin/books", methods=["POST"])
def add_book():

    try:

        data = request.get_json()

        title = data["title"]
        author = data["author"]
        category = data["category"]
        rating = data["rating"]
        image = data["image"]
        description = data["description"]

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(

            """
            INSERT INTO books
            (title, author, category, rating, image, description)
            VALUES (%s,%s,%s,%s,%s,%s)
            """,

            (
                title,
                author,
                category,
                rating,
                image,
                description
            )

        )

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({

            "success": True,
            "message": "Book Added Successfully"

        })

    except Exception as e:

        return jsonify({

            "success": False,
            "message": str(e)

        }), 500


# =====================================
# Admin - Update Book
# =====================================

@admin.route("/admin/books/<int:id>", methods=["PUT"])
def update_book(id):

    try:

        data = request.get_json()

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(

            """
            UPDATE books
            SET
                title=%s,
                author=%s,
                category=%s,
                rating=%s,
                image=%s,
                description=%s
            WHERE id=%s
            """,

            (
                data["title"],
                data["author"],
                data["category"],
                data["rating"],
                data["image"],
                data["description"],
                id
            )

        )

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({

            "success": True,
            "message": "Book Updated Successfully"

        })

    except Exception as e:

        return jsonify({

            "success": False,
            "message": str(e)

        }), 500


# =====================================
# Admin - Delete Book
# =====================================

@admin.route("/admin/books/<int:id>", methods=["DELETE"])
def delete_book(id):

    try:

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(

            "DELETE FROM books WHERE id=%s",

            (id,)

        )

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({

            "success": True,
            "message": "Book Deleted Successfully"

        })

    except Exception as e:

        return jsonify({

            "success": False,
            "message": str(e)

        }), 500