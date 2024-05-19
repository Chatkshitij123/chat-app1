// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//     return jwt.sign({id},process.env.JWT_SECRET,{
//         expiresIn: "30d",
//     });
//     //i am going to sign a new token with that particular id
// };

// module.exports = generateToken;
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    try {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    } catch (error) {
        // Handle token generation error
        console.error("Error generating token:", error);
        return null;
    }
};

module.exports = generateToken;
