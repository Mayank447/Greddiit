const mongoose=require('mongoose')

const ReportSchema=new mongoose.Schema({
    reported_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    reported:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    concern:{
        type: String,
        required: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text:{
        type:String,
        required:false
    },
    greddiit:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: Boolean,
        required: true,
        default: false
    },
    outcome:{
        type: String,
        enum: ['Block User','Delete Post','Ignore']
    }
},{timestamps: true})

module.exports = Report=mongoose.model('report',ReportSchema)