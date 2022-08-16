const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res)=>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }


    const {movil, password} = req.body
 

    try {

        //comprobar que existe un usuario registrado

        let usuario = await Usuario.findOne({movil});

        if(!usuario){
            return res.status(400).json({msg:'No exixte un usuario registrado con ese móvil'});}


        //comprobar que el password es correcto
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'La contraseña no es correcta'})
        }


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
        console.log(error)
        
    }
    
}


//obtiene que usuario es el que está autenticado
exports.usuarioAutenticado = async(req, res)=>{
     try {
         const usuario = await Usuario.findById(req.usuario.id).select('-password');
         res.json({usuario});
         
     } catch (error) {
         console.log(error);
         res.status(500).json({msg:'Hubo un error'});
         
     }

}