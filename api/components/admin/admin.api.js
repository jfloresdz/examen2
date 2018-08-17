'use strict';
const infoModel = require('./admin.model');

module.exports.registrar = function(req, res){
    let nuevoDato = new infoModel({
        nombre: req.body.nombre,
        cedula:req.body.cedula,
        telefono:req.body.telefono,
        correo:req.body.correo,
        foto:req.body.foto,
        contrasena:req.body.contrasena
    });

    nuevoDato.save(function(error){
        if(error){
            res.json({
                success : false,
                msj : 'El admin no pudo ser registrado: ' + error
            });
        }else{
            res.json({
                success : true,
                msj : 'El admin ha sido registrado de forma exitosa'
            });
        }
    });
};

module.exports.listar = function(req, res){
    infoModel.find().then(
        function(admins){
            res.send(admins);
        });
};