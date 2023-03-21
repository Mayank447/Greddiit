const mongoose=require('mongoose')

const GreddiitSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    creator:{
        type: mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    number_of_people:{
        type: Number,
        default: 1
    },
    people:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
    },
    growth_of_member:[{
        member:{
            type: Number,
            default: 0
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    number_of_posts:{
        type: Number,
        default: 0
    },
    post:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'post'
    },
    visitor:[{
        count:{
            type: Number,
            default: 0
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    post_vs_date:[{
        count:{
            type: Number,
            default: 0
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    joining_request:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user',
        required: false
    },
    description:{
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: false
    },
    banned_keywords:{
        type: [String],
        required: false
    },
    // image:{
    //     type: Binary,
    //     required: false
    // },
    reports:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'report',
        required: false
    },
    blocked_users:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        required: false
    },
    users_left:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        required: false
    },
    deleted_posts_count:{
        type: Number,
        default: 0
    },
    reported_post_count:{
        type: Number,
        default: 0
    }
},{timestamps: true})

module.exports = Greddiit = mongoose.model('greddiit',GreddiitSchema)