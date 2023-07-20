const express = require('express')
const router = express.Router()
const {
  body,
  validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User')
const fetchuser = require('../Middleware/fetchuser')
const JWT_SECREAT="dilipgour";

router.post('/signup', 
  body('name', 'name should be 3 character long').isLength({
    min: 3
  }), 
  body('email', 'wrong email').isEmail(),
  
  body('password', 'password should be 5 character long').isLength({
    min: 5
  }), async (req, res) => {
    const result = await validationResult(req);
    let success=false
    if (!result.isEmpty()) {
     return res.status(400).json({success,result})
    }
    let user = await User.findOne({'email':req.body.email});
    if (user) {
      
      return res.json({success,'err':'email already exists'})
    }
    const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(req.body.password, salt);
    
    user= new User({
      'name':req.body.name,
      'email':req.body.email,
      'password':hash
    } )
    user.save()
    const data={
      user:{
        id:user._id
      }
    }
    const token = jwt.sign( data, JWT_SECREAT);
    success=true
    res.json({success,token})
    
    
  })
// define the about route



router.post('/login', body('email', 'wrong email').isEmail(),
   body('password', 'password should be 5 character long').isLength({ min: 5}), async (req, res) => {
  const result = validationResult(req);
    let success=false
    if (!result.isEmpty()) {
     return res.status(400).json({success,result})
    }
    let user = await User.findOne({'email':req.body.email});
    if (!user) {
      
      return res.json({success,'err':'user not found'})
    }
    const compare=bcrypt.compareSync(req.body.password, user.password);
    if(!compare){
      return res.json({success,'err':'Wrong password'})
    }
    const data={
      user:{
        id:user._id
      }
    }
    const token = jwt.sign( data, JWT_SECREAT);
    success=true
    res.json({success,token})
    
})




router.post('/getuser',fetchuser,async (req, res) => {
  
    let id=req.user.id
   // console.log(id)
    const user= await User.findById(id)
    res.json(user)
    
})



module.exports = router