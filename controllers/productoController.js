const Producto = require('../models/Producto');
const { validationResult} = require('express-validator');
const cloudinary = require('cloudinary').v2



//crear un participante
exports.crearProducto= async(req, res)=>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
        //crear un nuevo producto

        const producto= new Producto(req.body);
        await producto.save();
        res.status(200).json(producto);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
    }

}

//obtener todos los productos

exports.obtenerProductos= async(req, res)=>{

    try {
        const productos = await Producto.find({});

        res.status(200).json({productos});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
        
    }
}

//modificar un producto

exports.modificarProducto= async(req, res)=>{

    try {

        //comprobar que existe el producto
        let productoFind = await Producto.findById(req.params.id);

        if(!productoFind){
            return res.status(404).json({msg:'Producto no encontrado'});
        }

        //actualizar producto
        await Producto.updateOne({_id:req.params.id},{$set:req.body});

        res.status(200).json({msg:'Modificado correctamente'});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
    }

}

//eliminar un participante
exports.eliminarProducto= async(req,res)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.APIKEY,
        api_secret: process.env.APISECRET
      });

      console.log ({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.APIKEY,
        api_secret: process.env.APISECRET
      })

    try {

        //comprobar que existe el producto
        let productoFind = await Producto.findById(req.params.id);
        console.log(productoFind)

        if(!productoFind){
            return res.status(404).json({msg:'Producto no encontrado'});
        }

        //eliminar

        cloudinary.uploader.destroy(productoFind.cloud_id, function(error,result) {
            console.log(result, error) });

        await Producto.findOneAndRemove({_id:req.params.id});

        res.status(200).json({msg:'Producto eliminado correctamente'});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
    }


}