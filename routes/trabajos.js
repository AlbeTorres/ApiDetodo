// rutas trabajos
const express = require('express');
const router = express.Router();
const trabajosController = require('../controllers/trabajosController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//crear un trabajo
//api/trabajos
router.post('/',auth,
    [
        check('titulo','El titulo no puede estar vacio').not().isEmpty(),
        check('integrantes','No puedes agregar un trabajo sin integrantes').not().isEmpty()
    ],
    trabajosController.crearTrabajo
);

//obtener todos los trabajos
router.get('/',auth,
    trabajosController.obtenerTrabajos
);

//modificar un trabajo
router.patch('/:id',auth,
    trabajosController.modificarTrabajo
);

//eliminar un trabajo
router.delete('/:id',auth,
    trabajosController.eliminarTrabajo
);

module.exports= router;