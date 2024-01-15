const express = require('express');
const router = express.Router();
const {Author} = require('../Models/Authors');

const joi = require('joi');

/**
 * @desc Get All authors
 * @route /api/authors
 * @method Get
 */
router.get('/', async (req, res) => {
    try {
        const AutherGet = await Author.find();
        res.send(AutherGet)
    } catch (e) {
        res.send(e)
    }

})
/**
 * @desc get  authors by id
 * @route /api/authors/:id
 * @method get
 */
router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.send(author)
    } catch (e) {
        res.send(e.message)
    }

})

/**
 * @desc add authors
 * @route /api/authors/
 * @method post
 */
router.post('/', async (req, res) => {
    const {error} = schemaAalidateAdd(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message})

    }
    try {
        const Addaut = new Author({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Country: req.body.Country,
            img: req.body.img
        })
        const result = await Addaut.save()
        res.status(201).json(result);
        console.log(req.body)
    } catch (e) {
        console.log(e)
    }
})
/**
 * @desc up  authors by id
 * @route /api/authors/:id
 * @method put
 */
router.put('/:id', async (req, res) => {
    try {
        const autherPut = await Author.findByIdAndUpdate(req.params.id, {
            $set: {
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Country: req.body.Country,
                img: req.body.img
            }
        }, {new: true})
        res.send(autherPut)
        console.log("done")
    } catch (e) {
        res.send(e)
    }

})
/**
 * @desc delete  authors by id
 * @route /api/authors/:id
 * @method delete
 */
router.delete('/:id', async (req, res) => {
    try {
        const autherDelete = await Author.findByIdAndDelete(req.params.id);
        res.send(autherDelete);
        console.log("Auther Delete Done!")


    } catch (e) {
        res.send(e)
    }

})

function schemaAalidateAdd(obj) {
    const schema = joi.object({
        FirstName: joi.string().min(3).max(50).trim().required(),
        LastName: joi.string().min(3).max(50).trim().required(),
        Country: joi.string().min(3).max(50).trim().required(),
        img: joi.string(),
    })
    return schema.validate(obj)

}

module.exports = router