from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class ProductCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('product_category.id'), nullable=False)
    category = db.relationship('ProductCategory', backref='products')

# Create database tables
with app.app_context():
    db.create_all()


# Routes
@app.route('/product-categories', methods=['GET'])
def get_categories():
    categories = ProductCategory.query.all()
    return jsonify([{'id': c.id, 'name': c.name} for c in categories])

@app.route('/products-for-category', methods=['GET'])
def get_products_for_category():
    category_id = request.args.get('cat')
    page_size = int(request.args.get('pageSize', 10))
    page = int(request.args.get('page', 1))

    products = Product.query.filter_by(category_id=category_id)\
        .paginate(page=page, per_page=page_size).items
    return jsonify([
        {'id': p.id, 'name': p.name, 'price': p.price, 'category_id': p.category_id}
        for p in products
    ])

@app.route('/shopping-cart', methods=['POST'])
def update_shopping_cart():
    cart_data = request.json
    print("Received cart data:", cart_data)  # For debugging
    return jsonify({'message': 'Shopping cart updated successfully'})

if __name__ == '__main__':
    app.run(debug=True)
