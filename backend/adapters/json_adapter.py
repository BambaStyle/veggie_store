import json

class JSONAdapter:
    def __init__(self, file_path):
        self.file_path = file_path

    def read_data(self):
        with open(self.file_path, "r") as file:
            data = json.load(file)
        return data

    @staticmethod
    def get_categories(data_source):
        with open(data_source, "r") as file:
            data = json.load(file)
        return data["categories"]

    def get_products_for_category(self, category_id):
        data = self.read_data()
        return [product for product in data["products"] if product["category_id"] == category_id]
