const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const protect = asyncHandler(async (req,res, next) => {
    let token;
//if authorization has taken with named bearer
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //token looks like this Bearer vavbabvvvAvk we have to split them 
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
//we have to find the user in the database with the decoded it and return it without the password
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
            
        }
    }
    
    if(!token){
        res.status(401);
            throw new Error("Not authorized, no token");
    }
    
});

module.exports = {protect};