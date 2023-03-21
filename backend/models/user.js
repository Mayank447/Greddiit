const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    contactnumber:{
        type: Number,
        required: true
    },
    follower:{
        type: Number,
        default: 0
    },
    follower_list:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user',
        default: []
    },
    following:{
        type: Number,
        default: 0
    },
    following_list:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user'
    },
    sub_greddiit:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'greddiit',
        required: false
    },
    greddiit:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'greddiit',
        required: false
    },
    posts_saved:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'post',
        required: false
    }
});

module.exports=User=mongoose.model('user',UserSchema);