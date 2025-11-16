# python_server.py (Updated to address warnings)
from flask import Flask, request, jsonify
import os
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

# Path to directory containing model and tokenizer (saved via save_pretrained)
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'model_dir')

# ... (Error checking for MODEL_DIR omitted for brevity, assuming it's fixed) ...

print(f"Loading model and tokenizer from: {MODEL_DIR}")

model = GPT2LMHeadModel.from_pretrained(MODEL_DIR)
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_DIR)

# --- Add this line to set a default pad token ID for generation ---
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token 

model.eval()  # Set model to eval mode

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    ingredients = data.get('ingredients', '')
    if not ingredients:
        return jsonify({'error': 'Ingredients parameter is required'}), 400

    prompt = f"Generate recipe with ingredients: {ingredients}"

    # Use tokenizer output dictionary to get input_ids AND attention_mask
    inputs = tokenizer.encode_plus(prompt, return_tensors="pt", padding=True, truncation=True)
    input_ids = inputs['input_ids']
    attention_mask = inputs['attention_mask'] # Get the mask

    outputs = model.generate(
        input_ids=input_ids,
        attention_mask=attention_mask, # Pass the attention mask
        max_length=500,
        num_beams=5,
        early_stopping=True,
        no_repeat_ngram_size=2
    )

    recipe = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({'recipe': recipe})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
