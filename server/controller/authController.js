const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const signup = async (req,res)=>{
    try{
        const {name, email, password, confirmPassword}=req.body;


        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match!', success: false });
        }

        //check if the user already exists
        const user =await UserModel.findOne({ email });
        if(user){
            return res.status(409)
                        .json({message: 'User is already exist, you can login',success: false});
    
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    }catch(err){
        console.log('signup error:',err);
        
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
    })
}
}


const login = async (req,res)=>{
    try{
        const {email, password}=req.body;

        //check if the user already exists
        const user =await UserModel.findOne({ email });
        const errorMsg= 'Email or Password is wrong!';
        if(!user){
            return res.status(403)
                        .json({message: errorMsg,success: false});
    
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({message: errorMsg,success: false});

        }

        JWT_SECRET="secret-123"; //.env
        const jwtToken = jwt.sign({email:user.email, _id:user._id},
                JWT_SECRET,
                {expiresIn: '24h'}
        )
      
        res.status(200)
            .json({
                // console.log("JWT Token:", jwtToken);

                message: "Login successfully",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    }catch(err){
        console.log('signin error:',err);
        
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
    })
}
}

module.exports ={signup,login};
