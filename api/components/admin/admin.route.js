'use strict';

const express = require('express');
const router = express.Router();

const datosApi = require('./admin.api');

router.route('/registrarAdmin')
.post(function(req, res){
    datosApi.registrar(req, res);
});

router.route('/listarAdmins')
    .get(function(req, res){
    datosApi.listar(req, res);
});

module.exports = router;