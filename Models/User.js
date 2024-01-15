const mongoose = require('mongoose');
const joi = require("joi");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 100,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 200,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
const UserModel = mongoose.model("UserModel", UserSchema)

//Validat Register User
function ValidateRegisterUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(3).max(100).email().required(),
        username: joi.string().trim().min(5).max(100).required(),
        password: joi.string().trim().min(5).required(),

    })
    return schema.validate(obj);
}

//Validat Login User
function ValidateLoginUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).email().required(),
        password: joi.string().trim().min(5).required(),
    })
    return schema.validate(obj);
}
function ValidateUpdateUser(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).email(),
        username: joi.string().trim().min(5).max(100),
        password: joi.string().trim().min(5),

    })
    return schema.validate(obj);
}
module.exports = {
    UserModel,
    ValidateRegisterUser,
    ValidateLoginUser,
    ValidateUpdateUser
}