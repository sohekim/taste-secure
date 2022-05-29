</br>
<H1 > Taste Secure </H1>
<p >The goal of this project is to offer recipes with good nutritional value to low income individuals. </p>


## Table of Contents

- [Features](#features)
- [Implementation](#implementation)
- [GraphQL Queries](#graphQL-Queries)
- [Feedback](#feedback)
- [Frontend](#frontend)

<p float="left">
<img alt="screenshot" src="https://i.ibb.co/hZR7MfP/splash.png" width="200">
<img alt="screenshot" src="https://i.ibb.co/gSxS2Tq/1.png" width="200">
<img alt="screenshot" src="https://i.ibb.co/5vqy2Xd/3.png" width="200">
<img alt="screenshot" src="https://i.ibb.co/3Nw0d6M/2.png" width="200">
</p>


## Features 
* Users can check today’s recommendation.
* Users can filter recipes based on criteria.
    * nutrition amount - descriptive ex) high protein / low in sugar / low in fat 
    * price for each serving (individual) $, $$, $$$, $$$$
    * Ingredients - pick recipes based on choosen main ingredients
* Users can save their favorite recipes

## Implementation

| Backend              | Database       | Frontend               |
| -------------------- |----------------| -----------------------|
| Express              | MongoDB        | Swift                  |
| GraphQL | Mongoose   |                |                        |
| Apollo Server        |                |                        |

### Package structure for backend folder
  * Model folder
      * Recipe Schema for MongoDB databse
  * Schema folder
      * reslover.js - Define queries and mutations of Recipe Model for the GraphQL Server
      * TypeDef.js - user defined types (ie. recipeType) for GraphQL
  * server.js
      * Server file, configuration for database, and the relative PORT number based on the flavor 

The backend is currently running on the server: cs-vm-04.cs.mtholyoke.edu
If you want to run the server locally, here are the instructions. 

### Prerequisites
* Install npm
* Install all the node package needed for the project
```
npm install
```

### Running backend
* ```npm start```

    This commend runs the project in production mode and sets the NODE_ENV =prod. During production mode, we are using PORT 31600, which is the PORT in the vm.

* ```npm run dev```

    This commend runs the project in development mode and sets the NODE_ENV=dev. During devlopment mode, we are using local host and PORT 4040.

### Flavors
There are two flavors for this project: ```dev``` and ```prod```

If you run in development, it will connect to the development database with mock data. If you run in production, it will connect to the production databse with the actual data. So make sure if you are using the correct flavor! 

The server on VM is running in production. 

## GraphQL Queries
* ```getAllRecipes()``` :
This API returns all the recipes from our database. 
* ```getRecipe(id)``` :
This API returns a recipe with the specified ID. It requires the id of the recipe. 
* ```searchRecipe(filter)```:
This API returns an array of recipes that matches the filter.We have filters based on 6 nutrition distribution: 1.low_cal, high_protein, low_carbs,low_fats, high_fibre, low_chol and we also filter based on the prices to cook the recipe.
* ```getHomeRecipe()```:
This API returns a random recipe from our database. In this API we only provide the image field and the description of the recipe. 
* ```getRecipesOfTheDay()```:
This API returns a three random recipe from our database. It is used to recommend a user to try new recipes each time they open the app. In this API we provide the name, price, minutes to cook and image field of the recipe.

#### GraphQL Mutations
* ```createRecipe(args)``` : We create a new recipe based on the specified Recipe fields. We return the new created recipe. 
* ```deleteRecipe(id)``` : This mutation deletes the recipe with the specified ID. If the the delete was successful we return a boolean value true. If the delete was not successful we return a boolean value false.
* ```updateRecipe(id,recipe)```: We update an existing recipe of the specified ID and return the updated Recipe. This is used to update certain fields of the recipe.

## Frontend

### Requirements 
* XCode 13.2
* Swift 5 

### Running frontend
* Unzip the "foodrecipe 00.27.57" file.
* Open "foodrecipe.xcworkspace" file inside the unzipped folder. 
* Select appropriate simulator (iPhone 13 preferred).
* Click the run button or command + R to run the project.

### Libraries Used 
* SwiftUI
* Foundation
* UIKit
* Apollo 

### Package structure for frontend folder
This app uses the Model-View-ViewModel (MVVM) architecture. 
* View folder: contains files that handles the structure, layout, and appearance of the every page in the app 
   * SearchView 
   * MainPageView 
   * FavoritesView 
   * RecipeDetailView 
* Model folder: has a Model file that encapsulate the app's data
* ViewModel folder: has the ViewModel file that holds the classes (for each view) and functions to support the state of the View
* Graphql-related files: fetch graphql queries and configure endpoint url for apollo client
   * Network.swift
   * Repo.swift
   * Queries.graphql
* Auto-generated files: Pods (for apollo integration via cocoapods), schema.json (input file required by Apollo iOS), API.swift, Info.plist

### Functionalities
* Shows a splash screen when user first opens the app
* Users can switch between three pages via bottom nav bar: main page, search page, and favorite page
* Main page: displays home recipe and recipe of the day
* Search page: user can check all recipes available in the database, search for keyworks and apply filters at the same time or separately
* Favorite page: user can add or remove bookmark of a recipe through recipe detail page

## Feedback
More than welcome to send any feedback / feature request by filling an issue or email

