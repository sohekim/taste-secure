const { gql } = require("apollo-server-express");

const typeDefs = gql `
  type Pair {
    name: String
    val: Int
  }

  type Recipe {
    id: ID
    name: String!
    description: String!
    price_per_serving: Int!
    minutes: Int!
    nutritions: [Pair]
    main_ingredients: [String]!
    ingredients: [String]
    instruction: [String]!
    image_url: String
  }

  input RecipeFilter {
    keyword: String
    price: Int
    main_ingredients: [String]
    low_cal: Boolean
    high_protein: Boolean
    low_carbs: Boolean
    low_fats: Boolean
    high_fibre: Boolean
    low_chol: Boolean
  }

  type Query {
    getAllRecipes: [Recipe]
    getRecipe(id: ID): Recipe
    searchRecipe(filter: RecipeFilter): [Recipe]
    getHomeRecipe: Recipe 
    getRecipesOfTheDay: [Recipe]
  }

  input PairInput {
    name: String
    val: Int
  }

  input RecipeInput {
    name: String!
    description: String!
    price_per_serving: Int!
    minutes: Int!
    nutritions: [PairInput]
    main_ingredients: [String]!
    ingredients: [String]
    instruction: [String]!
    image_url: String
  }

  type Mutation {
    createRecipe(recipe: RecipeInput): Recipe
    deleteRecipe(id: ID): Boolean
    updateRecipe(id: ID, recipe: RecipeInput): Recipe
  }
`;

module.exports = typeDefs;