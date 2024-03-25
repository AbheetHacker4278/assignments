const {Admin} =  require('../db');
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username  =  req.headers.username;
    const password = req.headers.password;
    Admin.findOne({
        username: username,
        password: password
    }).then((data)=>{
        if(data){
            next();
        }
        else{
            res.status(404).json({
                ServerReply : "Admin not Found"
            })
        }
    })


}

module.exports = adminMiddleware;