const express=require('express')
const router=express.Router()
const auth=require('../../middleware/auth')
const User=require('../../models/user')
const {check,validationResult}=require('express-validator')
const bcrypt=require('bcrypt')
const { genSalt } = require('bcrypt');

// @route POST api/signup
// @desc  Register an user
// @access Public
router.post('/',[
    check('firstname','First Name is required').isAlpha(),
    check('lastname','Last Name is required').isAlpha(),
    check('username','Username is Required').isAlphanumeric(),
    check('email','Enter a valid email address').isEmail(),
    check('password').not().isEmpty().withMessage('Password cannot be empty')
    .isLength({min:8,max:30}).withMessage('Password must be atleast 8 and atmost 30 characters'),
    check('age','Age must be a positive number').isInt({min:0, max:150}),
    check('contactnumber','Please enter a valid phone number').isMobilePhone()
],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {firstname,lastname,age,username,email,password,contactnumber}=req.body;

    try{
        //Checking if the user exists
        let user=await User.findOne({email})
        let user2=await User.findOne({username})
        if(user || user2){
            return res.status(400).json({errors: [{message: "User already exists"}]})
        }

        user=new User({
            firstname, lastname, age, username, email, password, contactnumber
        })

        //Encyrpting the password
        const salt=await genSalt(10);
        user.password= await bcrypt.hash(password,salt)

        await user.save();
        res.status(200).json({msg:'Account created'})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});


// @route  GET api/profile
// @desc   Get the current user profile
// @access private
router.get('/',auth,async (req,res)=>{
    try{
        const profile=await User.findById(req.user.id).select('_id firstname lastname age contactnumber age email username follower follower_list following following_list')
            .populate([{path: 'follower_list', select:'_id username'},
            {path:'following_list',select:'_id username'}])
            
        if(!profile){
            return res.status(400).json({msg:'Profile does not exist'})
        }

        res.status(200).json({profile: profile})
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'Server Error'})
    }
});


// @route  PUT api/profilepage
// @desc   Update the user profile
// @access private
router.put('/',[auth,[
    check('firstname','First Name is required').isAlpha(),
    check('lastname','Last Name is required').isAlpha(),
    check('username','Username is Required').isAlphanumeric(),
    check('email','Enter a valid email address').isEmail(),
    check('password').not().isEmpty().withMessage('Password cannot be empty')
    .isLength({min:8,max:30}).withMessage('Password must be atleast 8 and atmost 30 characters'),
    check('age','Age must be a positive number').isInt({min:0, max:150}),
    check('contactnumber','Please enter a valid phone number').isMobilePhone()
]],async (req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {firstname,lastname,age,username,email,password,contactnumber}=req.body;

        //Checking if the email, username are already occupied
        let user=await User.findOne({email})
        if(user && !(user.id===req.user.id)) return res.status(400).json({msg:"This email-id is already in use"})
        
        user=await User.findOne({username})
        if(user && !(user.id===req.user.id)) return res.status(400).json({msg:"This Username is already taken"})
        
        //Updating the user info
        let id=req.user.id;
        await User.findByIdAndUpdate({_id:id},{firstname: firstname, lastname: lastname,
            age: age, username: username, email: email, contactnumber: contactnumber, password: password
        })
        res.json({msg:"Your profile was updated"})
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports = router;