const Banner = require('../models/Banner');
const { validationResult} = require('express-validator');
const cloudinary = require('cloudinary').v2



//crear un banner
exports.crearBanner= async(req, res)=>{
    
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
        //crear un nuevo banner

        const banner= new Banner(req.body);
        await banner.save();
        res.status(200).json(banner);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
    }

}

//obtener todos los banners

exports.obtenerBanners= async(req, res)=>{

    try {
        const banners = await Banner.find({});

        res.status(200).json({banners});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
        
    }
}

//modificar un banner

exports.modificarBanner= async(req, res)=>{

    try {

        //comprobar que existe el producto
        let bannerFind = await Banner.findById(req.params.id);

        if(!bannerFind){
            return res.status(404).json({msg:'Producto no encontrado'});
        }

        //actualizar producto
        await Banner.updateOne({_id:req.params.id},{$set:req.body});
        const banner = await banner.findById(req.params.id)

        res.status(200).json({banner});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
        
    }

}

//eliminar un banner
exports.eliminarBanner= async(req,res)=>{
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

        //comprobar que existe el banner
        let bannerFind = await Banner.findById(req.params.id);

        if(!bannerFind){
            return res.status(404).json({msg:'Producto no encontrado'});
        }

        //eliminar

        cloudinary.uploader.destroy(bannerFind.cloud_id, function(error,result) {
            console.log(result, error) });

        await Banner.findOneAndRemove({_id:req.params.id});

        res.status(200).json({msg:'Producto eliminado correctamente'});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'})
    }


}