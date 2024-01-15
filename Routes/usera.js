const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {UserModel, ValidateRegisterUser, ValidateLoginUser, ValidateUpdateUser} = require('../Models/User')
//jw
const {verifyTokenAndAuth, verifyTokenAndAdmin} = require('../Middleware/verifyToken')

/**
 * @desc Get All Users
 * @route /api/User
 * @method put
 */
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        const {error} = ValidateUpdateUser(req.body)
        if (error) {
            return res.status(400).json({massage: error.details[0].massage})
        }
        if (req.body.password) {
            const selt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, selt)
        }
        const UpdateUser = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            }
        }, {new: true}).select("-password")
        res.send(UpdateUser)
        console.log(req.headers)
    } catch (e) {
        res.send(e)
    }

})
/**
 * @desc Get All Users
 * @route /api/users/
 * @method Get
 */
router.get('/',verifyTokenAndAdmin, async (req, res) => {
    try {
        const getAllUsres = await UserModel.find().select("-password");
        res.json(getAllUsres)

    } catch (e) {
        res.json(e)
    }

})

module.exports = router