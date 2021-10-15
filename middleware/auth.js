const jwt = require("jsonwebtoken");
const Register = require("../regesters");

const auth = async (req,res, next) =>{
    try {

        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "thisisthesecretkeyforourfinaltaskofTRFworkshop");

        console.log(verifyUser);
        const user = await Register.findOne({_id:verifyUser._id});
        // console.log(user);
        next();
    } catch (error) {
        res.send("You are not logged in. Please login before going to secret page.");
    }
}

module.exports = auth;