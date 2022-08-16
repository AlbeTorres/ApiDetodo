// rutas productos
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');


//crear un producto
//api/productos
router.post('/',auth,
    [ 
        check('titulo','El titulo es obligatorio').not().isEmpty(),
        check('categoria', 'La categoría es obligatoria').not().isEmpty(),
        check('img', 'La imagen es obligatoria').not().isEmpty(),
    
    ],
    productoController.crearProducto
);

//obtener todos los participantes
router.get('/',auth,
    productoController.obtenerProductos
    );

//modificar un participante
router.patch('/:id',auth,
    productoController.modificarProducto
    );

//eliminar un participante
router.delete('/:id',auth,
    productoController.eliminarProducto
    );


module.exports= router;
