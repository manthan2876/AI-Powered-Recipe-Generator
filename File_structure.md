## File Structure

```
├── backend/                                    # Node.js Express backend
│   ├── config/                                 # Configuration files
│   │   └── db.js                               # Database configuration
│   ├── controllers/                            # Route controllers
│   │   ├── recipeController.js
│   │   ├── recipeGenerationController.js  
│   │   ├── shoppingListController.js  
│   │   └── userController.js  
│   ├── middleware/                             # Express middleware
│   │   ├── authMiddlewear.js  
│   │   └── errorMiddlewear.js  
│   ├── models/                                 # Mongoose models
│   │   ├── recipeModel.js  
│   │   ├── shoppingListModel.js  
│   │   └── userModel.js  
│   ├── routes/                                 # API routes
│   │   ├── recipeGenerationRoutes.js  
│   │   ├── recipeRoutes.js  
│   │   ├── shoppinngListRoutes.js  
│   │   └── userRoutes.js  
│   ├── services/                               # Service layer
│   │   └── aiService.js 
│   ├── utils/                                  # token layer
│   │   └── generateToken.js 
│   ├── .env                                    # environment variables
│   ├── recipenlg_model.pkl                     # trained model file       
│   ├── seed.js                                 # static recipes data file
│   ├── python1_service.py                      # python small server for model integration
│   ├── start_python_service.js                 # python server entry point
│   └── server.js                               # Server entry point
├── frontend/                                   # React frontend
│   ├── public/                                 # Static files
│   └── src/                                    # React source code
│       ├── api/                                # api integrationn logics
│       │   ├── auth.js
│       │   ├── recipeGeneration.js
│       │   ├── recipes.js
│       │   └── shoppingLists.js
│       ├── components/                         # Reusable components
│       │   ├── auth/
│       │   │   └── AuthModel.js
│       │   ├── layout/
│       │   │   ├── Footer.js
│       │   │   └── Header.js
│       │   ├── recipe/
│       │   │   ├── RecipeCard.js
│       │   │   ├── RecipeDetail.js
│       │   │   └── RecipeSearch.js
│       │   ├── shoppingList/
│       │   │   ├── ShoppingList.js
│       │   │   └── ShoppingListDetail.js
│       ├── context/                            # React context
│       │   ├── LanguageContext.js
│       │   └── ShoppingListDetail.js
│       ├── pages/                              # Page components
│       │   ├── AboutUs.js
│       │   ├── ManageAccount.js
│       │   ├── RecipeGenerationPage.js
│       │   ├── SavedRecipes.js
│       │   └── ShoppingLists.js
│       ├── App.css                             # css for App.js
│       ├── App.test.js                         # test file
│       ├── index.css                           # css for index.js
│       ├── index.js                            # main enttry point of react (like main.jsx)
│       ├── reportWebVitals.js                  # ?                
│       ├── setupTests.js                       # test file
│       └── App.js                              # Main application component
├── package-lock.json                           # pakage's locks
└── package.json                                # package file
```