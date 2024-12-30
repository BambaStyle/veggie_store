from controllers.product_controller import product_blueprint

def register_routes(app):
    app.register_blueprint(product_blueprint, url_prefix="/")
