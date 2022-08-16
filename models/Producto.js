const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({

    titulo:{
        type: String,
        required: true,
        trim: true
    },
    categoria:{
        type: String,
        required:true,
        trim: true
    },
    img:{
        type: String,
        required:true,
    },
    provincia:{
        type: String,
        required:true,
        trim: true
    },
    municipio:{
        type: String,
        required:true,
        trim: true
    },
    precio:{
        type: Number,
    },
    movil:{
        type: Number,
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    registro:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Producto', ProductoSchema);