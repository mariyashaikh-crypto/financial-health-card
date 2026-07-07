from flask import request, jsonify


def register_routes(app):

    @app.route("/predict", methods=["POST"])
    def predict():

        data = request.get_json()

        print(data)

        response = {
            "score": 842,
            "risk": "Low",
            "loan_amount": "₹18 Lakh",
            "status": "Approved",
            "confidence": 98
        }

        return jsonify(response)