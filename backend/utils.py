import argparse
import os

def get_database_uri():
    parser = argparse.ArgumentParser(description='Set the database for the app')
    parser.add_argument('--db', type=str, required=False, help='Path to the database file')
    args, _ = parser.parse_known_args()

    db_path = args.db or 'store.db'

    if db_path.endswith('.db'):
        return f'sqlite:///{os.path.abspath(db_path)}'
    elif db_path.endswith('.json'):
        # Implement custom JSON database handling if needed
        return f'json:///{os.path.abspath(db_path)}'
    elif db_path.endswith('.txt'):
        # Implement custom TXT database handling if needed
        return f'txt:///{os.path.abspath(db_path)}'
    else:
        raise ValueError('Unsupported database format. Use .db, .json, or .txt')
