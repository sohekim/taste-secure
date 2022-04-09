const Post = require("../models/Post.model");
const Recipe = require("../models/Recipe.model");

const resolvers = {
    Query: {
        hello: () => {
            return "Hello World";
        },
        // or use promises
        getAllPosts: async() => {
            return await Post.find();
        },
        getPost: async(_, { id }) => {
            return await Post.findById(id);
        },

        getAllRecipes: async() => {
            return await Recipe.find();
        },
        getRecipe: async(_, { id }) => {
            return await Recipe.findById(id);
        },
    },

    Mutation: {
        createRecipe: async(_, args) => {
            const {
                name,
                description,
                price_per_serving,
                minutes,
                main_ingredients,
                instruction,
            } = args.recipe;

            const newRecipe = {
                name: name,
                description: description,
                price_per_serving: price_per_serving,
                minutes: minutes,
                main_ingredients: main_ingredients,
                instruction: instruction,
            };
            const recipe = await new Recipe(newRecipe).save();
            return recipe;
        },

        deleteRecipe: async(_, { id }) => {
            try {
                await Recipe.findByIdAndDelete(id);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },

        createPost: async(_, args) => {
            const { title, description } = args.post;
            const newPost = {
                title: title,
                description: description,
            };

            const post = await new Post(newPost).save();
            return post;
        },

        deletePost: async(_, { id }) => {
            await Post.findByIdAndDelete(id);
            return "Ok, post deleted";
        },

        updatePost: async(_, { id, post }) => {
            const { title, description } = post;
            const newPost = {
                title: title,
                description: description,
            };

            const updatedpost = await Post.findByIdAndUpdate(id, newPost, {
                new: true,
            });
            return updatedpost;
        },
    },
};

module.exports = resolvers;