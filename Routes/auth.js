const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const {UserModel, ValidateRegisterUser, ValidateLoginUser, ValidateUpdateUser} = require('../Models/User')
const jwt = require('jsonwebtoken')

/**
 * @desc RegisterUser
 * @route /api/auth
 * @method Get
 */
router.post('/register', async (req, res) => {
    const {error} = ValidateRegisterUser(req.body)
    if (error) {
        return res.status(400).json({masg: error.details[0].message})
    }

    try {
        let user = await UserModel.findOne({email: req.body.email})
        if (user) {
            return res.status(400).json({massage: "This User Alrde "})
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
        user = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        })
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            username: user.username,
            password: user.password
        }, process.env.JWT_KEY)

        const result = await user.save()
        const {password, ...other} = result._doc;
        res.status(201).json({...other, token})
    } catch (e) {
        res.json(e)
        console.log(e)
    }
})

/**
 * @desc LoginUser
 * @route /api/auth/Login
 * @method Get
 */
router.post('/login', async (req, res) => {
    const {error} = ValidateLoginUser(req.body)
    if (error) {
        return res.status(400).json({masg: error.details[0].message})
    }

    try {
        //Valid Email
        let user = await UserModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(400).json({massage: "Email Invalid "})
        }
        const passwordUser = await bcrypt.compare(req.body.password, user.password)
        //Valid Password
        if (!passwordUser) {
            return res.status(400).json({massage: "Password Invalid "})
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            username: user.username,
            password: user.password
        }, process.env.JWT_KEY)
        const {password, ...other} = user._doc;
        res.status(200).json({...other, token})

        console.log(token + "This User")
    } catch (e) {
        res.json(e)
        console.log(e + "404")
    }
})
module.exports = router