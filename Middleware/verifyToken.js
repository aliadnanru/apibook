const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.token
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.user1 = decoded
            // console.log( token)
            next();
        } catch (e) {
            res.json({message: "Invalid Token"})
        }
    } else {
        res.json({message: "No Token"})
    }
}

//verify Token And Auth
function verifyTokenAndAuth(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user1.id === req.params.id || req.user1.isAdmin) {
            next();
        } else {
            return res.json({mas: "You are not allwed"})
        }
    })

}

//verify Token And admin
function verifyTokenAndAdmin(req, res, next) {
   verifyToken(req,res,()=>{
       if (!req.user1.isAdmin) {
           console.log(req.user1.isAdmin)
           return res.json({mas: "You are not Admin"})

       } else {
           next();
       }
   })

}


module.exports = { verifyTokenAndAuth, verifyTokenAndAdmin}