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
    // nutritions: {
    //     type: [{ type: String, val: Number }],
    //     required: true,
    // },
    // calories,
    main_ingredients: {
        type: [String],
        required: true,
    },
    instruction: {
        type: [String],
        required: true,
    },
    // date: {
    //     type: Date,
    //     default: Date.now(),
    // },
});

module.exports = Recipe = mongoose.model("recipe", recipeSchema);