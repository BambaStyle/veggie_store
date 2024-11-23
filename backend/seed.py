from app import app, db, ProductCategory, Product

def seed_database():
    # Drop all existing data and recreate the tables
    db.drop_all()
    db.create_all()

    # Define product categories
    categories = [
        ProductCategory(name="Fruits"),
        ProductCategory(name="Vegetables"),
        ProductCategory(name="Grains"),
        ProductCategory(name="Dairy"),
        ProductCategory(name="Nuts & Seeds")
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
        Product(name="Cashews", price=3.8, category_id=5)
    ]

    # Add products to the database
    db.session.add_all(products)
    db.session.commit()
    print("Database seeded successfully!")

# Run the seed function within the app context
if __name__ == "__main__":
    with app.app_context():
        seed_database()
