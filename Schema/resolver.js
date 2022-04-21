const Recipe = require("../models/Recipe.model");

const resolvers = {
    Query: {
        getAllRecipes: async() => {
            return await Recipe.find();
        },
        getRecipe: async(_, { id }) => {
            return await Recipe.findById(id);
        },
        searchRecipe: async(_, { filter }) => {
            const dbfilter = {};

            if (filter.keyword !== undefined) {
                dbfilter.name = { $regex: filter.keyword, $options: "i" };
            }

            if (filter.price !== undefined) {
                let min, max;
                switch (filter.price) {
                    case 1:
                        min = 0;
                        max = 3;
                        break;
                    case 2:
                        min = 3;
                        max = 5;
                        break;
                    case 3:
                        min = 5;
                        max = 7;
                        break;
                    default:
                        min = 8;
                        max = 20;
                }
                dbfilter.price_per_serving = { $gt: min, $lt: max };
            }

            if (filter.main_ingredients !== undefined) {
                dbfilter.main_ingredients = { $all: filter.main_ingredients };
            }

            // todo: add the rest of nutrition fields
            // change the range
            if (filter.low_cal) {
                dbfilter.nutritions = {
                    $elemMatch: { key: "calories", value: { $gt: 10, $lt: 150 } },
                };
            }

            return await Recipe.find(dbfilter);
        },
        getHomeRecipe: async() => {
            const result = await Recipe.aggregate([{ $sample: { size: 1 } }]);
            return result[0];
        },
        getRecipesOfTheDay: async() => {
            return await Recipe.aggregate([{ $sample: { size: 5 } }])
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
                ingredients,
                instruction,
                image_url,
            } = args.recipe;

            const newRecipe = {
                name: name,
                description: description,
                price_per_serving: price_per_serving,
                minutes: minutes,
                nutritions: nutritions,
                main_ingredients: main_ingredients,
                ingredients: ingredients,
                instruction: instruction,
                image_url: image_url,
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
                ingredients,
                instruction,
                image_url,
            } = recipe;

            const newRecipe = {
                name: name,
                description: description,
                price_per_serving: price_per_serving,
                minutes: minutes,
                nutritions: nutritions,
                main_ingredients: main_ingredients,
                ingredients: ingredients,
                instruction: instruction,
                image_url: image_url,
            };

            const updatedRecipe = await Recipe.findByIdAndUpdate(id, newRecipe, {
                new: true,
            });
            return updatedRecipe;
        },
    },
};

module.exports = resolvers;