const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    tokens : [{
        token: {
            type:String,
            required:true
        }
    }]
    

})

userSchema.methods.generateToken = async function(){
    try{
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()}, "thisisthesecretkeyforourfinaltaskofTRFworkshop");
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(error){
        res.send("ERROR: "+ error);
        console.log("ERROR: "+ error);
    }
}





const Register = new mongoose.model("Register", userSchema);
module.exports = Register;