Setup (MongoDB Compass + Local)

1) Create a database and connection string in MongoDB Compass
   - Open Compass, connect to your local or Atlas cluster
   - Create database: recipe_generator_db
   - Collections: users, recipes

2) Environment variables (create .env at project root)
   MONGO_URI=mongodb://localhost:27017/recipe_generator_db
   JWT_SECRET=change_me
   NODE_ENV=development
   PORT=5000

3) Start servers from project root
   npm install
   npm --prefix frontend install
   npm run dev

Notes
 - Ingredient search uses Mongo first with { ingredients: { $all: [...] } } and falls back to RETRIEVAL_MODEL_ENDPOINT when configured.
 - Indexes are defined on ingredients and title for fast searches.

# AI-Powered Recipe Generator - Backend

This is the backend server for the AI-Powered Recipe Generator application. It provides RESTful API endpoints for user authentication, recipe management, and AI-powered recipe generation and search.

## Features

- **User Authentication**: Register, login, profile management
- **Recipe Management**: Create, read, update, delete recipes
- **AI Recipe Generation**: Generate recipes based on ingredients and preferences
- **Recipe Search**: Search recipes by ingredients, cuisine, meal type
- **Reviews and Ratings**: Add reviews and ratings to recipes
- **Favorites**: Save and manage favorite recipes

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication
- **Axios**: HTTP client for API calls

## API Endpoints

### Users

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Authenticate user & get token
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Recipes

- `GET /api/recipes` - Get all recipes (with pagination)
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create a new recipe
- `PUT /api/recipes/:id` - Update a recipe
- `DELETE /api/recipes/:id` - Delete a recipe
- `POST /api/recipes/:id/reviews` - Add a review to a recipe
- `GET /api/recipes/top` - Get top-rated recipes

### AI Features

- `POST /api/recipes/generate` - Generate a recipe using AI
- `GET /api/recipes/search` - Search recipes by ingredients
- `PUT /api/recipes/:id/favorite` - Toggle favorite recipe
- `GET /api/recipes/favorites` - Get user's favorite recipes

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/AI-Powered-Recipe-Generator.git
   cd AI-Powered-Recipe-Generator/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   AI_MODEL_ENDPOINT=http://localhost:5001/api/generate
   RETRIEVAL_MODEL_ENDPOINT=http://localhost:5001/api/search
   ```

4. Start the server
   ```bash
   npm run dev
   ```

## AI Model Integration

The backend integrates with two AI models:

1. **Generative Model**: Creates new recipes based on ingredients and preferences
2. **Retrieval Model**: Searches for existing recipes based on ingredients

These models are accessed through API endpoints defined in the `aiService.js` file. The models can be hosted separately or as part of the same application.

## Database Schema

### User
- `name`: String
- `email`: String (unique)
- `password`: String (hashed)
- `isAdmin`: Boolean

### Recipe
- `user`: ObjectId (reference to User)
- `title`: String
- `image`: String (URL)
- `ingredients`: Array of Strings
- `instructions`: Array of Strings
- `cuisine`: String
- `mealType`: String
- `dietaryRestrictions`: Array of Strings
- `prepTime`: Number
- `cookTime`: Number
- `servings`: Number
- `difficulty`: String (enum: Easy, Medium, Hard)
- `isGenerated`: Boolean
- `reviews`: Array of Review objects
- `rating`: Number
- `numReviews`: Number
- `isFavorite`: Boolean

### Review
- `user`: ObjectId (reference to User)
- `name`: String
- `rating`: Number
- `comment`: String

## Error Handling

The application uses a custom error handling middleware that returns appropriate HTTP status codes and error messages in JSON format.

## Authentication

The application uses JSON Web Tokens (JWT) for authentication. Protected routes require a valid token in the Authorization header.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request