from flask import Blueprint, jsonify, request
from adapters.product_adapter import ProductAdapter

product_blueprint = Blueprint('product', __name__)

@product_blueprint.route('/product-categories', methods=['GET'])
def get_categories():
    categories = ProductAdapter.get_categories()
    return jsonify(categories)

@product_blueprint.route('/products-for-category', methods=['GET'])
def get_products_for_category():
    category_id = request.args.get('cat')
    page_size = int(request.args.get('pageSize', 10))
    page = int(request.args.get('page', 1))
    products = ProductAdapter.get_products_by_category(category_id, page, page_size)
    return jsonify(products)
