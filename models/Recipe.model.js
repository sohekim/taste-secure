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
        type: [{ name: String, val: Number }],
        required: true,
    },
    main_ingredients: {
        type: [String],
        required: true,
    },
    ingredients: {
        type: [String],
        required: false,
    },
    instruction: {
        type: [String],
        required: true,
    },
    image_url: {
        type: String,
        required: false,
    },
});

module.exports = Recipe = mongoose.model("recipe", recipeSchema);