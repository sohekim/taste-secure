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

            if (filter.keyword !== "") {
                dbfilter.name = { $regex: filter.keyword, $options: "i" };
            }

            if (filter.price !== -1) {
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

            if (filter.main_ingredients.length !== 0) {
                dbfilter.main_ingredients = { $all: filter.main_ingredients };
            }

            if (filter.low_cal) {
                dbfilter.nutritions = {
                    $elemMatch: { name: "calories", val: { $gt: 0, $lt: 401 } },
                };
            }

            if (filter.high_protein) {
                dbfilter.nutritions = {
                    $elemMatch: { name: "protein", val: { $gt: 25 } },
                };
            }

            if (filter.low_carbs) {
                dbfilter.nutritions = {
                    $elemMatch: { name: "carbs", val: { $lt: 31 } },
                };
            }

            if (filter.low_fats) {
                dbfilter.nutritions = {
                    $elemMatch: { name: "fats", val: { $lt: 7 } },
                };
            }

            if (filter.high_fibre) {
                dbfilter.nutritions = {
                    $elemMatch: { name: "fibre", val: { $gt: 6 } },
                };
            }

            if (filter.low_chol) {
                dbfilter.nutritions = {
                    $elemMatch: { name: "cholestrol", val: { $lt: 21 } },
                };
            }

            return await Recipe.find(dbfilter);
        },
        getHomeRecipe: async() => {
            const result = await Recipe.aggregate([{ $sample: { size: 1 } }]);
            result.forEach(element => {
                element.id = element._id
            });
            return result[0];
        },
        getRecipesOfTheDay: async() => {
            const result = await Recipe.aggregate([{ $sample: { size: 3 } }]);
            result.forEach(element => {
                element.id = element._id
            });
            return result;
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