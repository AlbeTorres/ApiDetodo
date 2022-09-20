const mongoose = require('mongoose');

const BannerSchema = mongoose.Schema({
    cloud_id:{
        type: String,
        required:true,
    },
    img:{
        type: String,
        required: true,
    },
    usuario:{
        type: Number,
        required: true
    },
    enlace:{
        type: String,
        required: true,
        trim:true
    },
    date:{
        type:String,
        required:true

    },
    municipio:{
        type:String,
        required:true
    },
    provincia:{
        type:String,
        required:true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    registro:{
        type: Date,
        default: Date.now()
    }
}) 

module.exports = mongoose.model('Banner', BannerSchema);