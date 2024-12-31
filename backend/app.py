from flask import Flask
from flask_cors import CORS
import argparse
from extensions import db

# Initialize Flask App
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

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
    # Initialize extensions only for database type 'db'
    db.init_app(app)
else:
    raise ValueError("Unsupported file type. Use a .db or .json file.")

# Register Blueprints
from controllers.product_controller import product_blueprint
app.register_blueprint(product_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
