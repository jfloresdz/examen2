const express = require('express');
const router = express.Router();
const hoteles = require('./hoteles.api');

router.route('/registrarhotel')
    .post(function(req, res){
    hoteles.registrar(req, res);
});

router.route('/listarhoteles')
    .get(function(req, res){
    hoteles.listar(req, res);
});

router.route('/filtrarhoteles')
    .post(function(req, res){
    hoteles.filtrar(req, res);
});

router.route('/actualizarhotel')
    .post(function(req, res){
    hoteles.actualizar(req, res);
});

module.exports = router;