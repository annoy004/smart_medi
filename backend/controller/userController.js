import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";


// @desc  Auth user and get token
// @route POST /api/users/login
//@access Public
const authUser =asyncHandler (async (req ,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email})// actually we write email:email by both are same so we write email only
    
    if(user && ( await user.matchPassword(password))) {
        generateToken(res,user._id);
  
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isadmin,
           
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
    
    
    
}) ;

// @desc register user
// @route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Name, email, and password are required');
      }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isadmin,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });
// @desc logout user/clear cookie
// @route POST /api/users/logout
//@access Private
const logoutUser=asyncHandler (async (req ,res) => {
    res.cookie('jwt', '' , {
        httpOnly:true,
        expires: new Date(0),
    });
    res.status(200).json({message:'Logged out succesfully'});
    
}) ;

// @desc get user profile
// @route GET /api/users/profile
//@access Private
const getUserProfile=asyncHandler (async (req ,res) => {
    const user = await User.findById(req.user._id);// humlog ne protect karke ek middleware banaya the bas wahi hai usme req.user kiya tha bas wahi se user aa raha hai

    if(user) {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}) ;


// @desc UPDATE user profile
// @route Put /api/users/profile
//@access Private
const updateUserProfile=asyncHandler (async (req ,res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
    
    if(req.body.password) {
        user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
        _id:updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin:updatedUser.isadmin,
    })
}
else{
    res.status(404);
    throw new Error('User not found');
}
}) ;

///////////////////////////// for admin

// @desc Get users
// @route Put /api/users
//@access Private/Admin
const getUsers=asyncHandler (async (req ,res) => {
    res.send('get Users');
    
}) ;


// @desc Get user by id
// @route Put /api/users/:id
//@access Private/Admin
const getUserById=asyncHandler (async (req ,res) => {
    res.send('get User by id');
    
}) ;



// @desc Delete user
// @route Put /api/users/:id
//@access Private/Admin
const deleteUser=asyncHandler (async (req ,res) => {
    res.send('delete User');
    
}) ;


// @desc Update user
// @route Put /api/users/:id
//@access Private/Admin
const updateUser=asyncHandler (async (req ,res) => {
    res.send('update User');
    
}) ;


export {
    authUser,
    registerUser ,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,

}




