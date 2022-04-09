const Recipe = require("../models/Recipe.model");

const resolvers = {
    Query: {
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
                nutritions,
                main_ingredients,
                instruction,
            } = args.recipe;

            const newRecipe = {
                name: name,
                description: description,
                price_per_serving: price_per_serving,
                minutes: minutes,
                nutritions: nutritions,
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

        updateRecipe: async(_, { id, recipe }) => {
            // todo: a way to do it dynamically (only pass the field to change)
            const {
                name,
                description,
                price_per_serving,
                minutes,
                nutritions,
                main_ingredients,
                instruction,
            } = recipe;

            const newRecipe = {
                name: name,
                description: description,
                price_per_serving: price_per_serving,
                minutes: minutes,
                nutritions: nutritions,
                main_ingredients: main_ingredients,
                instruction: instruction,
            };

            const updatedRecipe = await Recipe.findByIdAndUpdate(id, newRecipe, {
                new: true,
            });
            return updatedRecipe;
        },
    },
};

module.exports = resolvers;