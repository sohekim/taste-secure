const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price_per_serving: {
        type: Number,
        required: true,
    },
    minutes: {
        type: Number,
        required: true,
    },
    nutritions: {
        type: [{ key: String, value: String }],
        required: true,
    },
    main_ingredients: {
        type: [String],
        required: true,
    },
    instruction: {
        type: [String],
        required: true,
    },
});

module.exports = Recipe = mongoose.model("recipe", recipeSchema);