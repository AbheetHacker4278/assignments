// Middleware for handling auth
const jwt = require('jsonwebtoken');
const secrets = require('../index');
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedvalue = jwt.verify(jwtToken , secrets);
    if(decodedvalue.username){
        next();
    }else{
        res.status(404).json({
            ServerReply :  "Invalid Username detected and JWT Token is invalid"
        })
    }

}

module.exports = adminMiddleware;