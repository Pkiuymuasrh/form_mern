const { string, required } = require('joi');
const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    Name:{ type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
});
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this_id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token
};

const User = mongoose.model("user",userSchema);

const validate = (data) => {
    const schema = Joi.object({
        Name:Joi.string().required().label("Name"),
        email:Joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password")
    });
    return schema.validate(data)
};
module.exports = {User,validate};