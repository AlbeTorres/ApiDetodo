const Participante = require('../models/Participante');
const { validationResult} = require('express-validator');



//crear un participante
exports.crearParticipante= async(req, res)=>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
        //crear un nuevo participante

        const participante= new Participante(req.body);
        participante.creador = req.usuario.id;
        await participante.save();
        res.status(200).json(participante);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
    }

}

//obtener todos los participantes

exports.obtenerParticipantes= async(req, res)=>{

    try {
        const participantes = await Participante.find({});

        res.status(200).json({participantes});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
        
    }
}

//modificar un participante

exports.modificarParticipante= async(req, res)=>{

    try {

        //comprobar que existe el participante
        let participanteFind = await Participante.findById(req.params.id);

        if(!participanteFind){
            return res.status(404).json({msg:'Participante no encontrado'});
        }

        //actualizar partcicipante
       await Participante.updateOne({_id:req.params.id},{$set:req.body});

       const resolve = await Participante.findById(req.params.id);

        res.status(200).json(resolve);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
    }

}

//eliminar un participante
exports.eliminarParticipante= async(req,res)=>{

    try {

        //comprobar que existe el participante
        let participanteFind = await Participante.findById(req.params.id);

        if(!participanteFind){
            return res.status(404).json({msg:'Participante no encontrado'});
        }

        //eliminar
        await Participante.findOneAndRemove({_id:req.params.id});

        res.status(200).json({msg:'Participante eliminado correctamente'});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
    }


}