const Trabajo = require('../models/Trabajo');
const {validationResult} = require('express-validator');



exports.crearTrabajo= async(req, res)=>{
     //revisar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()});
     }

     try {

        //crear trabajo
        const trabajo = new Trabajo(req.body);
        trabajo.creador = req.usuario.id;

        await trabajo.save();
        res.status(200).json(trabajo);
         
     } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
         
     }
    
}

//obtener todos los trabajos
exports.obtenerTrabajos= async(req, res)=>{

    try {

         const trabajos = await Trabajo.find();
         res.status(200).json({trabajos});

    } catch (error) {
       console.log(error)
       res.status(500).json({msg:'Hubo un error'})
        
    }

}
exports.modificarTrabajo= async(req, res)=>{

    try {

        //verificar que el trabajo existe
        const trabajoFind = await Trabajo.findById(req.params.id);
        if(!trabajoFind){
            return res.status(404).json({msg:'No existe el trabajo a modificar'});
        }

        //actualizar trabajo
        await Trabajo.updateOne({_id:req.params.id},{$set: req.body})

        const resolve = await Trabajo.findById(req.params.id);
        res.status(200).json(resolve);
         
    } catch (error) {
       console.log(error)
       res.status(500).json({msg:'Hubo un error'})
        
    }

}
exports.eliminarTrabajo= async(req, res)=>{

    try {

         //verificar que el trabajo existe
         const trabajoFind = Trabajo.find(req.params.id);
         if(!trabajoFind){
             return res.status(404).json({msg:'No existe el trabajo a modificar'});
         }

         //eliminar trabajo
         await Trabajo.findOneAndRemove({_id:req.params.id});
         res.status(200).json({msg:'Trabajo eliminado correctamente'});
         
    } catch (error) {
       console.log(error)
       res.status(500).json({msg:'Hubo un error'})
        
    }

}