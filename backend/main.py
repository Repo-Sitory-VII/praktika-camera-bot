from flask import request, jsonify
from config import app, db
from models import Contact

@app.route("/contacts", methods=['GET'])
def get_contacts():
    return jsonify({"contacts": list(map(lambda x: x.to_json(), Contact.query.all()))})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)