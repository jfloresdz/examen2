'use strict';

const express = require('express');
const router = express.Router();

const datosApi = require('./login.api');

router.route('/login')
.post(function(req, res){
    datosApi.login(req, res);
});

router.route('/comprobarCorreo')
.post(function(req, res){
    datosApi.comprobarCorreo(req, res);
});

router.route('/contrasenaEstudiante')
.post(function(req, res){
    datosApi.contrasenaEstudiante(req, res);
});

router.route('/contrasenaProfesor')
.post(function(req, res){
    datosApi.contrasenaProfesor(req, res);
});

router.route('/contrasenaCliente')
.post(function(req, res){
    datosApi.contrasenaCliente(req, res);
});

router.route('/contrasenaAdmin')
.post(function(req, res){
    datosApi.contrasenaAdmin(req, res);
});

module.exports = router;