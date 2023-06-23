const User = require('./../models/userModel');
const AppError = require('../utils/appError');

exports.register= async(req,res,next)=>{

    const newUser= await User.create(req.body);
    
    res.status(200).json({
      status:"success",
      data:{
        message:"Registraion was sucessful",
        newUser

      }
    })
  next();
}

exports.login= async(req,res,next)=>{
    const { email, password } = req.body; 
  
    // 1) Check if  email && password exist
    if (!email || !password) {
       
        return next(new AppError('Please provide email and password!', 400));

          
      }

      // 2 ) Check if user exist && password is  correct
  const user = await User.findOne({ email}).select('+password');


  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

 
    res.status(200).json({
      status:"success",
       message:"Login Successful"
      
    })
    
  
  
 

 ///next();
}

// exports.protect=async(req,res,next)=>{
//   const email = req.body.email;
//   const currentUser = await User.findOne({email})

//   req.locals.user = currentUser;

//   req.user = currentUser;

//   if(currentUser)
//   {
//     res.status(200).render("d")
    
//   }
  
//next();
//}

//Teacher 

exports.restrictTo = (role) =>{
  return (req, res, next)=>{ 
 
  if(!role.includes(req.user.role)){ 
     return next( new AppError('You do not have permission to perform this action' , 403))
  }

  next(); 
  }
}