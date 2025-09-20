# AI-Powered Recipe Generator

An innovative application that uses AI to generate personalized recipes based on available ingredients, dietary restrictions, and user preferences. The application combines a generative model for creating new recipes and a retrieval model for finding similar existing recipes.

## Project Overview

The AI-Powered Recipe Generator is a full-stack web application that helps users discover and create recipes. It features:

- **AI Recipe Generation**: Create custom recipes based on ingredients and preferences
- **Recipe Search**: Find recipes by ingredients, cuisine, meal type, etc.
- **User Accounts**: Save favorite recipes, create personal recipe collections
- **Reviews and Ratings**: Community feedback on recipes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Repository Structure

```
├── Model/                  # AI model code
│   ├── generative_model.py # T5-based recipe generation model
│   ├── retrieval_model.py  # TF-IDF based recipe retrieval model
│   └── train_model.py      # Training script for models
├── backend/                # Node.js Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── services/           # Service layer
│   └── server.js           # Server entry point
├── frontend/               # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── context/        # React context
│       ├── pages/          # Page components
│       ├── services/       # API service functions
│       └── App.js          # Main application component
└── Data preparation/       # Data preparation scripts and datasets
```

## Technology Stack

### Frontend
- React
- React Router
- Context API
- Axios
- CSS Modules

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

### AI Models
- PyTorch
- Transformers (T5 model)
- NLTK
- Scikit-learn
- PEFT (Parameter-Efficient Fine-Tuning)

## AI Model Architecture

### Generative Model
- Based on T5 (Text-to-Text Transfer Transformer)
- Fine-tuned on recipe data
- Uses LoRA (Low-Rank Adaptation) for efficient fine-tuning
- Generates structured recipes from ingredient lists and preferences

### Retrieval Model
- TF-IDF vectorization for ingredient matching
- Cosine similarity for recipe ranking
- Efficient search through existing recipe database

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory
   ```bash
   cd backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

### AI Model Setup

1. Set up a Python virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies
   ```bash
   pip install -r Model/requirements.txt
   ```

3. Run the model server (if deploying separately)
   ```bash
   python Model/serve_model.py
   ```

## Usage

1. Register for an account or log in
2. Use the recipe generator to create recipes based on your ingredients
3. Search for recipes using the search functionality
4. Save favorite recipes to your profile
5. Rate and review recipes

## Future Enhancements

- Mobile application
- Voice-activated recipe search and generation
- Meal planning and grocery list generation
- Nutritional analysis of recipes
- Integration with smart kitchen appliances

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recipe data sources
- Open-source AI model contributors
- The development team