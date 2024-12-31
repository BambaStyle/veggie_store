from flask import Flask
from flask_cors import CORS
import argparse
from extensions import db
import os
import json
from sqlalchemy.sql import text

# Initialize Flask App
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

# Argument Parser
parser = argparse.ArgumentParser(description="Veggie Store Backend")
parser.add_argument("--db", default="instance\\store.db", help="Path to the database (JSON or SQLite DB file)")
args = parser.parse_args()

# Resolve absolute path for the database source
db_source = os.path.abspath(args.db)

# Check if the file exists
if not os.path.exists(db_source):
    raise FileNotFoundError(f"The database file '{db_source}' does not exist.")

# Determine DB Type
if db_source.endswith(".json"):
    app.config["DB_TYPE"] = "json"
    app.config["DB_SOURCE"] = db_source

    # Verify the JSON file can be loaded
    try:
        with open(db_source, "r") as file:
            json.load(file)  # Attempt to load JSON to ensure it's valid
    except json.JSONDecodeError as e:
        raise ValueError(f"Error loading JSON file '{db_source}': {e}")
    except Exception as e:
        raise RuntimeError(f"An unexpected error occurred while loading JSON file '{db_source}': {e}")

elif db_source.endswith(".db"):
    app.config["DB_TYPE"] = "db"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_source}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Verify SQLite database connection
    try:
        from sqlalchemy import create_engine
        engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))  # Use text() to execute SQL
    except Exception as e:
        raise RuntimeError(f"Error connecting to SQLite database '{db_source}': {e}")

else:
    raise ValueError("Unsupported file type. Use a .db or .json file.")

# Initialize extensions
if app.config["DB_TYPE"] == "db":
    db.init_app(app)

# Register Blueprints
from controllers.product_controller import product_blueprint
app.register_blueprint(product_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
