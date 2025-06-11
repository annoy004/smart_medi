import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';


const protect = asyncHandler (async (req,res,next) => {// next is like ok we have done with this middle ware lets moveon to next one
    let token;

    token = req.cookies.jwt;//jwt because we named jwt inside the cookies in user controller
    if (token) {
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);// this is to decode the jwt token
           req.user = await User.findById(decode.userId).select('-password');
           next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized , token fail')
        }
    }else {
       res.status(401);
       throw new Error('Not authorized, no token') 
    }
})

const admin = (req,res,next) => {
    if(req.user &&  req.user.isadmin) {
        next();
    }else{
        res.status(401);
        throw new Error('Not authorised as admin')

    }
}
export {protect,admin} ;