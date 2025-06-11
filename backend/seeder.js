import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import colors from "colors";
import products from "./data/products.js";
import User from "./models/userModel.js"
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData =async() => {
 try {
    
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    console.log(createdUsers[0]._id);
    const adminUser =createdUsers[0]._id;

    const sampleProducts = products.map((product) =>{
    return {...product,user:adminUser};
    });
    // console.log(sampleProducts);
    await Product.insertMany(sampleProducts);
    console.log('data imported!'.green.inverse);

 } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
 }
}

const destroyData =async() => {
    try {
       
       await Product.deleteMany();
       await Order.deleteMany();
       await User.deleteMany();
   
       
   
       console.log('data destroyed!'.green.inverse);
       process.exit();
   
    } catch (error) {
       console.log(`${error}`.red.inverse);
       process.exit(1);
    }
   };

   if(process.argv[2] ==='-d') {
      //first two will be the path hence you have to see the third line which is two in terminal
    destroyData();
   }else {
    importData();
   }
