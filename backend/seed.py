from extensions import db
from flask import Flask

# Create a standalone Flask app for seeding
seed_app = Flask(__name__)
seed_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'
seed_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(seed_app)

class ProductCategory(db.Model):
    __tablename__ = 'product_category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('product_category.id'), nullable=False)
    category = db.relationship('ProductCategory', backref='products')

def seed_database():
    print("Dropping all existing tables...")
    db.drop_all()
    print("Creating all tables...")
    db.create_all()

    # Define product categories
    categories = [
        ProductCategory(name="Fruits"),
        ProductCategory(name="Vegetables"),
        ProductCategory(name="Grains"),
        ProductCategory(name="Dairy"),
        ProductCategory(name="Nuts & Seeds"),
        ProductCategory(name="scroll_test")  # New category for scrolling test
    ]
    db.session.add_all(categories)
    db.session.commit()

    # Define products for each category
    products = [
        # Fruits
        Product(name="Apple", price=1.2, category_id=1),
        Product(name="Banana", price=0.5, category_id=1),
        Product(name="Orange", price=1.1, category_id=1),
        Product(name="Grapes", price=2.5, category_id=1),
        Product(name="Strawberries", price=3.0, category_id=1),

        # Vegetables
        Product(name="Carrot", price=0.9, category_id=2),
        Product(name="Broccoli", price=1.8, category_id=2),
        Product(name="Spinach", price=1.5, category_id=2),
        Product(name="Potato", price=0.6, category_id=2),
        Product(name="Tomato", price=1.0, category_id=2),

        # Grains
        Product(name="Rice", price=1.0, category_id=3),
        Product(name="Quinoa", price=2.0, category_id=3),
        Product(name="Wheat", price=1.1, category_id=3),
        Product(name="Oats", price=1.5, category_id=3),
        Product(name="Barley", price=1.2, category_id=3),

        # Dairy
        Product(name="Milk", price=1.3, category_id=4),
        Product(name="Cheese", price=2.5, category_id=4),
        Product(name="Butter", price=2.0, category_id=4),
        Product(name="Yogurt", price=1.2, category_id=4),
        Product(name="Cream", price=1.8, category_id=4),

        # Nuts & Seeds
        Product(name="Almonds", price=3.5, category_id=5),
        Product(name="Peanuts", price=2.0, category_id=5),
        Product(name="Sunflower Seeds", price=1.8, category_id=5),
        Product(name="Walnuts", price=4.0, category_id=5),
        Product(name="Cashews", price=3.8, category_id=5),
    ]

    # Add 100 products for the "scroll_test" category
    for i in range(1, 101):
        products.append(Product(
            name=f"Scroll Test Item {i}",
            price=round(0.5 + (i * 0.1), 2),  # Incremental price
            category_id=6  # Category ID for "scroll_test"
        ))

    # Add products to the database
    db.session.add_all(products)
    db.session.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    with seed_app.app_context():
        seed_database()
