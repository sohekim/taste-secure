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

            // todo: change the min and max
            if (filter.price !== undefined) {
                let min, max;
                switch (filter.price) {
                    case 1:
                        min = 5;
                        max = 10;
                        break;
                    case 2:
                        min = 11;
                        max = 20;
                        break;
                    case 3:
                        min = 21;
                        max = 30;
                        break;
                    default:
                        min = 31;
                        max = 100;
                }
                dbfilter.price_per_serving = { $gt: min, $lt: max };
            }

            if (filter.main_ingredients !== undefined) {
                dbfilter.main_ingredients = { $all: filter.main_ingredients };
            }

            if (filter.low_cal) {
                dbfilter.nutritions = {
                    $elemMatch: { key: "calories", value: { $gt: 0, $lt: 401 } },
                };
            }

            if (filter.high_protein) {
                dbfilter.nutritions = {
                    $elemMatch: { key: "protein", value: { $gt: 25 } },
                };
            }

            if (filter.low_carbs) {
                dbfilter.nutritions = {
                    $elemMatch: { key: "carbs", value: { $lt: 31 } },
                };
            }

            if (filter.low_fats) {
                dbfilter.nutritions = {
                    $elemMatch: { key: "fats", value: { $lt: 7 } },
                };
            }

            if (filter.high_fibre) {
                dbfilter.nutritions = {
                    $elemMatch: { key: "fibre", value: { $gt: 6 } },
                };
            }

            if (filter.low_chol) {
                dbfilter.nutritions = {
                    $elemMatch: { key: "cholestrol", value: { $lt: 21 } },
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