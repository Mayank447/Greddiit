// const password=prompt("Enter the database password: ")
// const password='@Mayank447'
// const mongoURI=`mongodb+srv://MayankGoel:${password}@greddiit.6qr4bch.mongodb.net/?retryWrites=true&w=majority`

const mongoose=require('mongoose'); 
const config=require('config');
const mongoURI=config.get('mongoURI');

const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("MongoDB connected");
    }
    catch(err){
        console.error(err)
        process.exit(1); //Exit process with failure
    }
}

module.exports = connectDB;