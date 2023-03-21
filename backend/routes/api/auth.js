const express=require('express')
const router=express.Router();
const {check, validationResult}=require('express-validator');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const auth=require('../../middleware/auth')
const config=require('config')

const User=require('../../models/user')

// @route GET api/
// @desc Test route
// @access Public
router.get('/',auth,(req,res)=>{
    res.status(200).json({msg:'Valid'})
});


// @route POST api/auth/login/
// @desc  Login an user and get token
// @access Public
router.post('/login/',[
    check('email','Please enter a valid email address').isEmail(),
    check('password','Password is required').isLength({min:1})
],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email,password}=req.body;

    try{
        //Checking if the user exists
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({errors: [{message: "Invalid Credentials"}]})
        }

        //Matching the password
        const match=await bcrypt.compare(password,user.password)

        if(!match){
            return res.status(400).json({errors: [{msg: "Invalid Credentials"}]})
        }

        //Return a jsonwebtoken
        const payload={
            user:{
                id: user.id //MongoDB object ID
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000},(err,token)=>{
            if(err) console.error(err.message);
            else res.status(200).json({token: token});
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;