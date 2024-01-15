const express = require('express');
const router = express.Router();
//require Books Models
const {schemavalidateAdd, schemavalidateUp, Book} = require('../Models/Books')
//arr books test

/**
 * @desc Get All Books
 * @route /api/books
 * @method Get
 */
router.get("/", async (req, res) => {
    try {
        const bookGet = await Book.find();
        res.send(bookGet)
    } catch (e) {
        res.send(e)
    }

})
/**
 * @desc Get  Book By Id
 * @route /api/books/:id
 * @method Get
 */
router.get('/:id', async (req, res) => {
    try {
        const bookGetById = await books.findById(req.params.id)
        res.send(bookGetById)
    } catch (e) {
        res.send(e)
    }
})
/**
 * @desc add  Book
 * @route /api/books/
 * @method post
 */
router.post('/', async (req, res) => {
    const {error} = schemavalidateAdd(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0]})
    }
    try {
        const bookadd = new Book({
            Name: req.body.Name,
            Author: req.body.Author,
            Title: req.body.Title,
            Price: req.body.Price
        })
        const result = await bookadd.save()

        res.status(201).json(result);
        console.log(req.body)
    } catch (e) {
        res.send(e)
    }

});
/**
 * @desc up  Book by id
 * @route /api/books/:id
 * @method put
 */
router.put('/:id', async (req, res) => {
    const {error} = schemavalidateUp(req.body)
    if (Book) {
        return res.status(400).json({message: error})

    }
    try {
        const bookPut = Book.findByIdAndUpdate(req.params.id, {
            $set: {
                Name: req.body.Name,
                Author: req.body.Author,
                Title: req.body.Title,
                Price: req.body.Price
            }
        })
        const result = await bookPut.save()
        res.send(result)
    } catch (e) {
        res.send(e)
    }
})
/**
 * @desc delete  Book by id
 * @route /api/books/:id
 * @method delete
 */

router.delete('/:id', async (req, res) => {
    const bookDelete = await Book.findByIdAndDelete(req.params.id)
    res.send(bookDelete)
})
module.exports = router;