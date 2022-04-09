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
  }

  type Post {
    id: ID
    title: String
    description: String
  }

  type Query {
    hello: String
    getAllPosts: [Post]
    getPost(id: ID): Post

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
  }

  input PostInput {
    title: String
    description: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post

    createRecipe(recipe: RecipeInput): Recipe
    deleteRecipe(id: ID): Boolean
  }
`;

module.exports = typeDefs;