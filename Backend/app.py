from flask import Flask, request, jsonify
from flask_cors import CORS
from model.diabetes_model import predict_diabetes

app = Flask(__name__)

# Enable CORS
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json.get('input_data', [])
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        prediction = predict_diabetes(data)
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
