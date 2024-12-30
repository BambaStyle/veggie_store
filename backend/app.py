from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import argparse
import os

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Argument Parser
parser = argparse.ArgumentParser(description="Veggie Store Backend")
parser.add_argument("--db", required=True, help="Path to the database (JSON or SQLite DB file)")
args = parser.parse_args()

# Determine DB Type
db_source = args.db
if db_source.endswith(".json"):
    app.config["DB_TYPE"] = "json"
    app.config["DB_SOURCE"] = db_source
elif db_source.endswith(".db"):
    app.config["DB_TYPE"] = "db"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_source}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db = SQLAlchemy(app)
else:
    raise ValueError("Unsupported file type. Use a .db or .json file.")

# Register Blueprints
from controllers.product_controller import product_blueprint
app.register_blueprint(product_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
