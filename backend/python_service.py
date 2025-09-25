from flask import Flask, request, jsonify
import os
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

# Path to directory containing model and tokenizer (saved via save_pretrained)
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'model_dir')

print("Loading model and tokenizer...")
model = GPT2LMHeadModel.from_pretrained(MODEL_DIR)
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_DIR)

model.eval()  # Set model to eval mode

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    ingredients = data.get('ingredients', '')
    if not ingredients:
        return jsonify({'error': 'Ingredients parameter is required'}), 400

    # Prompt format as used in your notebook
    prompt = f"Generate recipe with ingredients: {ingredients}"

    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    outputs = model.generate(
        input_ids=input_ids,
        max_length=500,
        num_beams=5,
        early_stopping=True,
        no_repeat_ngram_size=2
    )

    recipe = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({'recipe': recipe})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
