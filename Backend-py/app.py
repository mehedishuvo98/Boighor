from flask import Flask, jsonify  #jsonify = python obj -> json obj
from flask_cors import CORS       #Cors = Browse permission 

from routes.books import books
from routes.auth import auth
from routes.reviews import reviews
from routes.users import users
from routes.admin import admin

app = Flask(__name__)

CORS(app)

app.register_blueprint(books)
app.register_blueprint(auth)
app.register_blueprint(reviews)
app.register_blueprint(users)
app.register_blueprint(admin)


# =====================================
# Home
# =====================================

@app.route("/")
def home():

    return jsonify({

        "message": "Book Review API Running"

    })


# =====================================
# Run Server
# =====================================

if __name__ == "__main__":

    app.run(debug=True)   #auto restart 