const express = require('express');
const User = require('../models/user');
const Vendor = require('../models/vendors');
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

authRouter.post('/api/signup', async(req, res) => {
    try{
        const {fullName, email, password} = req.body;
    const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({msg: " user with same email already exist"});
        }else{
            //Geneerate a salt with a cost factor of 10
            const salt = await bcrypt.genSalt(10);
            // hash the password using the generated salt
            const hashedPassword = await bcrypt.hash(password, salt);
           let user =  new User({fullName, email, password:hashedPassword});
           user = await user.save();
           res.json({user});
        }
    }catch (e) {
        res.status(500).json({error:e.message});
    }
});

authRouter.post('/api/signin', async(req, res)=>{
    try{
        const {email, password} = req.body;
        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(400).json({msg:"User not found with this email"})
        }else{
           const isMatch = await bcrypt.compare(password, findUser.password)
           if(!isMatch){
            return res.status(400).json({msg: 'Incorrect Password'});
           }else{
            const token = jwt.sign({id: findUser._id}, process.env.JWT_SECRET);
            //remove sensitive information
            const {password, ...userWithoutPassword } = findUser._doc;
            //send the response

            res.json({token,user: userWithoutPassword });
           }
        }
    }catch (e) {
        res.status(500).json({error:e.message});
    }
});
 //put route for updating user's state, city, locality

 authRouter.put('/api/users/:id',async (req, res)=>{
    try {
        //Extract the 'id' parameter from the request URL
        const{id} = req.params;
        //Extract the "state","city,"loavlity feilds from the request body
        const {state, city, locality} = req.body;
        //find the user by their id upadte the state, city and locality
        //the (the:true) option ensures the updated document is returned
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {state, city, locality},
            {new:true},
        );
        // if no user is found, return 4040 page not found status with an error message
        if(!updatedUser){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 });

authRouter.get('/api/users',async(req,res)=>{
    try {
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    }catch(e){
        res.status(500).json({error:e.message});
    }
});
//fetch all vendors(exclude password)
authRouter.get('/api/vendors', async(req,res)=>{
  try {
    const vendors = await Vendor.find().select('-password'); //Exclude password field
    return res.status(200).json(vendors);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;