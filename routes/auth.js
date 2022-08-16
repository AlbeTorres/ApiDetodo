//rutas autenticación

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController')
const auth = require('../middleware/auth');

//Iniciar sesión de un usuario
//api/auth
router.post('/',

    [
        check('movil','Agrega un móvil válido').not().isEmpty(),
        check('password', 'El password mínimo es de 6 caracteres').isLength({min:6})

    ],
    authController.autenticarUsuario
);

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports= router;