from flask import Blueprint, jsonify, request
from models.database import get_connection

auth = Blueprint("auth", __name__)

# ==========================
# Register User
# ==========================

@auth.route("/register", methods=["POST"])
def register():

    try:

        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        connection = get_connection()
        cursor = connection.cursor()

        # Check Email Exists
        cursor.execute(
            "SELECT * FROM users WHERE email=%s",
            (email,)
        )

        user = cursor.fetchone()

        if user:

            cursor.close()
            connection.close()

            return jsonify({

                "success": False,
                "message": "Email Already Exists"

            }), 400

        # New User (Default Role = user)
        cursor.execute(

            """
            INSERT INTO users(name,email,password,role)
            VALUES(%s,%s,%s,%s)
            """,

            (
                name,
                email,
                password,
                "user"
            )

        )

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({

            "success": True,
            "message": "Registration Successful"

        })

    except Exception as e:

        return jsonify({

            "success": False,
            "message": str(e)

        }), 500


# ==========================
# Login User
# ==========================

@auth.route("/login", methods=["POST"])
def login():

    try:

        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(

            """
            SELECT
                id,
                name,
                email,
                role
            FROM users
            WHERE email=%s
            AND password=%s
            """,

            (
                email,
                password
            )

        )

        user = cursor.fetchone()

        cursor.close()
        connection.close()

        if user:

            return jsonify({

                "success": True,
                "message": "Login Successful",
                "user": user

            })

        return jsonify({

            "success": False,
            "message": "Invalid Email or Password"

        }), 401

    except Exception as e:

        return jsonify({

            "success": False,
            "message": str(e)

        }), 500