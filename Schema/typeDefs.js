const { gql } = require("apollo-server-express");

const typeDefs = gql `
  type Pair {
    key: String
    value: String
  }

  type Recipe {
    id: ID
    name: String!
    description: String!
    price_per_serving: Int!
    minutes: Int!
    nutritions: [Pair]
    main_ingredients: [String]!
    instruction: [String]!
    image_url: String!
  }

  type Query {
    getAllRecipes: [Recipe]
    getRecipe(id: ID): Recipe
  }

  input PairInput {
      key: String
      value: String
  }

  input RecipeInput {
    name: String!
    description: String!
    price_per_serving: Int!
    minutes: Int!
    nutritions: [PairInput]
    main_ingredients: [String]!
    instruction: [String]!
    image_url: String!
  }

  type Mutation {
    createRecipe(recipe: RecipeInput): Recipe
    deleteRecipe(id: ID): Boolean
    updateRecipe(id: ID, recipe: RecipeInput): Recipe
  }
`;

module.exports = typeDefs;