const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario= async(req,res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {movil, password} = req.body
    
    try{

        let usuario = await Usuario.findOne({movil});

        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'});
        }

        //crea el usuario

        usuario =new Usuario(req.body);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);


        //guardar usuario
        await usuario.save();

        //crear y firmar jwt
        const payload ={
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600000

        },(error, token)=>{
            if(error) throw error;

            //Mensaje de confirmacion
            res.status(200).json({token});


        });

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Hubo un Error'});
    }

    
    
}

exports.modificarUsuario=async(req,res)=>{

     //revisar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()});
     }

     try {
         //verificar que el trabajo existe
        const usuarioFind = Usuario.find(req.params.id);
        if(!usuarioFind){
            return res.status(404).json({msg:'No existe el usuario a modificar'});
        }

         //actualizar trabajo
         await Trabajo.updateOne({_id:req.params.id},{$set: req.body})
         res.status(200).json({msg:'Modificado correctamente'});

     } catch (error) {
         console.log(error)
         res.status(500).json({msg:'Hubo un error'})
     }


}

exports.obtenerUsuarios=async(req,res)=>{

    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {

         //verificar que el usuario existe
        const usuarios = Usuario.find();

          //retornar usuario
        res.status(200).json({usuarios});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
    }
}

exports.eliminarUsuario= async(req, res)=>{

    try {

         //verificar que el trabajo existe
         const usuarioFind = Usuario.find(req.params.id);
         if(!usuarioFind){
             return res.status(404).json({msg:'No existe el usuario a eliminar'});
         }

         //eliminar usuario
         await Usuario.findOneAndRemove({_id:req.params.id});
         res.status(200).json({msg:'Usuario eliminado correctamente'});
         
    } catch (error) {
       console.log(error)
       res.status(500).json({msg:'Hubo un error'})
        
    }

}