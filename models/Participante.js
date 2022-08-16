const mongoose = require('mongoose');

const ParticipanteSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        trim: true
    },
    categoria:{
        type: String,
        required:true,
        trim: true
    },
    institucion:{
        type: String,
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

module.exports = mongoose.model('Participante', ParticipanteSchema);