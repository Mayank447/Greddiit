const express=require('express')
const app=express()
app.use(express.json({extended:false}))

//Connecting to the database
const connectDB=require('./config/db')
connectDB()

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { config } = require('dotenv')
const cors=require('cors')

const PORT = 4000
app.get('/',(req,res)=>{
    res.send('Home Page')
})

// Define Routes
app.use(cors())
app.use('/profile', require('./routes/api/profile'))
app.use('/auth', require('./routes/api/auth'))
app.use('/signup', require('./routes/api/profile'))
app.use('/post', require('./routes/api/post'))
app.use('/greddiit', require('./routes/api/greddiit'))
app.use('/follow', require('./routes/api/user'))
app.use('/user', require('./routes/api/user'))
app.use('/report', require('./routes/api/report'))



app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
});