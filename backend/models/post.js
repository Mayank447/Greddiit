const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    username:{
        type:String,
        ref: 'user',
        required: true
    },
    greddiit:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'greddiit',
        required: true
    },
    text:{
        type: String,
        required: true
    },
    upvotes:{
        type: Number,
        default: 0
    },
    upvoted_by:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
    },
    downvotes:{
        type: Number,
        default: 0
    },
    downvoted_by:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
    },
    comments:[{
            author:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            username_:{
                type: String,
                required: true
            },
            text:{
                type: String,
                required:true
            },
            date:{
                type: Date,
                default: Date.now
            }
        }]
},
{timestamps: true}
)

module.exports = Post = mongoose.model('post',PostSchema)