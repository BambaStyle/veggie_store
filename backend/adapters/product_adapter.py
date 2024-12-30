import json
from flask import current_app as app
from models.product import Product, ProductCategory

class ProductAdapter:
    @staticmethod
    def get_categories():
        if app.config["DB_TYPE"] == "json":
            data_source = app.config["DB_SOURCE"]
            with open(data_source, "r") as file:
                data = json.load(file)
            return data["categories"]
        elif app.config["DB_TYPE"] == "db":
            return ProductCategory.query.all()

    @staticmethod
    def get_products_by_category(category_id, page, page_size):
        if app.config["DB_TYPE"] == "json":
            data_source = app.config["DB_SOURCE"]
            with open(data_source, "r") as file:
                data = json.load(file)
            products = [
                p for p in data["products"]
                if p["category_id"] == int(category_id)
            ]
            start = (page - 1) * page_size
            end = start + page_size
            return products[start:end]
        elif app.config["DB_TYPE"] == "db":
            query = Product.query.filter_by(category_id=category_id)
            return query.paginate(page=page, per_page=page_size).items
