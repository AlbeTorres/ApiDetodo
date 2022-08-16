const mongoose = require('mongoose');

const TrabajoSchema = mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    registro:{
        type: Date,
        default: Date.now()
    },
    integrantes:{
        type: Array,
        require: true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    }

});

module.exports= mongoose.model('Trabajo', TrabajoSchema);