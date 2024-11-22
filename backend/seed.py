from app import db, ProductCategory, Product
from app import app

with app.app_context():
    db.drop_all()
    db.create_all()

    # Add categories
    fruits = ProductCategory(name='Fruits')
    vegetables = ProductCategory(name='Vegetables')
    db.session.add_all([fruits, vegetables])
    db.session.commit()

    # Add products
    products = [
        Product(name='Tomato', price=1.0, category_id=vegetables.id),
        Product(name='Cucumber', price=2.0, category_id=vegetables.id),
        Product(name='Apple', price=1.5, category_id=fruits.id),
        Product(name='Banana', price=0.5, category_id=fruits.id)
    ]
    db.session.add_all(products)
    db.session.commit()

    print("Database seeded successfully!")
