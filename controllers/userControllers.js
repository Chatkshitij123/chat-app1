const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password,pic} = req.body;
    console.log(req.body);
    if( !name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the fields");

    }

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name, email, password, pic
    });
    if(user){
     res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        isAdmin: user.isAdmin,
        //after registration is done and when i am sending it to the user i want to share the json token
        token: generateToken(user._id),
     });   
    }else{
        res.status(400);
        throw new Error("Failed to Create the User");
    }
    
});

const authUser = asyncHandler(async(req,res) => {
const {email, password} = req.body;
const user = await User.findOne({email});//we are finding the user on the basis of email field
//to match the password
if(user && (await user.matchPassword(password))){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
    });
}else{
    res.status(401);
    throw new Error("Invalid Email or Password");

}
});

// /api/user?search=piyush we use req.queries
// const allUsers = asyncHandler(async(req,res) => {
//     const keyword = req.query.search ? {
//        $or: [
//         { name: { $regex: req.query.search, $options: "i"} },
//         { email: { $regex: req.query.search, $options: "i"} },
//        ],
//     // $or: [
//     //     { name: req.query.search },
//     //     { email: req.query.search },
//     // ],
//     }
//    //regex are used for matching the pattern making strings and helps them to filter them
//    //option i for case in-sensitive
// : {};
// //this query is to find other users and not the signed user
// // const users = await  User.find(keyword).find({ _id: { $ne: req.user._id } });
// const users = await User.find({ ...keyword, _id: { $ne: req.user._id } });

// // const users = await  User.find(keyword);
// res.send(users);
// });
//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
    // Extract the search query from the request parameters
    const searchQuery = req.query.search;

    // Define the search filter based on the search query
    const searchFilter = searchQuery ? {
        $or: [
            // Case-insensitive search for name
            { name: { $regex: searchQuery, $options: "i" } },
            // Case-insensitive search for email
            { email: { $regex: searchQuery, $options: "i" } },
        ]
    } : {};

    try {
        // Find all users matching the search filter, excluding the current user
        const users = await User.find({ ...searchFilter, _id: { $ne: req.user._id } });

        // Send the array of users as the response
        res.send(users);
    } catch (error) {
        // If an error occurs during the database query, handle it appropriately
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = { allUsers };

module.exports = {registerUser, authUser, allUsers};

