// rutas productos
const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');


//crear un banner
//api/banners
router.post('/',auth,
    [ 
        check('usuario','El usuario es obligatorio').not().isEmpty(),
        check('enlace', 'El enlace es obligatorio').not().isEmpty(),
        check('img', 'La imagen es obligatoria').not().isEmpty(),
        check('date', 'La fecha es obligatoria').not().isEmpty(),
        check('municipio', 'El municipio es obligatorio').not().isEmpty(),
        check('provincia', 'La provincia es obligatoria').not().isEmpty(),
        check('cloud_id', 'El cloud_id es obligatorio').not().isEmpty(),
    
    ],
    bannerController.crearBanner
);

//obtener todos los banners
router.get('/',
    bannerController.obtenerBanners
    );

//modificar un banner
router.patch('/:id',auth,
    [ 
        check('usuario','El usuario es obligatorio').not().isEmpty(),
        check('enlace', 'El enlace es obligatorio').not().isEmpty(),
        check('img', 'La imagen es obligatoria').not().isEmpty(),
        check('date', 'La fecha es obligatoria').not().isEmpty(),
        check('municipio', 'El municipio es obligatorio').not().isEmpty(),
        check('provincia', 'La provincia es obligatoria').not().isEmpty(),
        check('cloud_id', 'El cloud_id es obligatorio').not().isEmpty(),

    ],
    bannerController.modificarBanner
    );

//eliminar un banner
router.delete('/:id',auth,
    bannerController.eliminarBanner
    );


module.exports= router;