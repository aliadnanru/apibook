const logger = (req, res, next) => {
    console.log(`${req.host} ${req.url}`)
    next()
}
module.exports = logger