const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =require('bcryptjs')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Provide your name!'],

    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        unique:true,
        lowercase:true,
        validate: [validator.isEmail, 'Please provid valid email']
    },
    role:{
        type:String,
        enum:['teacher','student'],
        required:[true,'Mention your role Student or Teacher']
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm:{
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          //imp:This only works on CREATE and SAVE !
          validator: function (el) {
            return el === this.password;
          },
          message: 'Password are not same!'
        }
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})


userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
        
     return await bcrypt.compare(candidatePassword, userPassword);
  }

const User = mongoose.model('User',userSchema);

module.exports=User;
