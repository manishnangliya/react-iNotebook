const express = require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'ThisIsASecretKey';
//create a User using: Post "/api/auth/createruser. Doesn't require Auth
router.post('/createruser',[
    body('name','Enter a valid name(minimum 3 length)').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Password should be minimum 5 characters').isLength({ min: 5 }),
], async (req,res)=>{
    let success=false;
    //if there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
        let user =await User.findOne({email:req.body.email});
        if(user)
        {
            return res.status(400).json({success ,error: "Sorry a user with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data ={
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken});
        // res.json(user)
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal Error !");
    }
})


//create a User using: Post "/api/auth/login. Doesn't require Auth
router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','password cannot be blank').exists(),
], async (req,res)=>{
    let success=false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({ success, errors:"Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success, errors:"Please try to login with correct credentials" });
        }
        const data ={
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error !");
    }
})

//Route 3:get logged in user details User using: Post "/api/auth/getuser. Login required
router.post('/getuser', fetchuser,async (req,res)=>{
    try {
        userId = req.user;
        const user = await User.findOne(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error !");
    }

})
module.exports = router