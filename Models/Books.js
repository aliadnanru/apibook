const mongoose = require('mongoose');
const joi = require("joi");
const BookSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
        minLength: 3
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Authors"
    }, Title: {
        type: String,
        required: true,
        trim: true,
    }, Price: {
        type: Number,
        required: true,

    }
}, {timestamps: true})
const Book = mongoose.model("Book", BookSchema)

//validate
function schemavalidateAdd(obj) {
    const schema = joi.object({
        Name: joi.string().required().trim(),
        Author: joi.required(),
        Title: joi.string().required().trim().max(20).min(3),
        Price: joi.number().required(),
    })
    return schema.validate(obj)
}

function schemavalidateUp(obj) {
    const schema = joi.object({
        Name: joi.string().trim(),
        // Author: joi.required().min(3).max(200),
        Title: joi.string().trim().max(10).min(3),
        Price: joi.number().min(0),
    })
    return schema.validate(obj)
}

module.exports = {
    Book,
    schemavalidateAdd,
    schemavalidateUp

}