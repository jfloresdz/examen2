'use strict';
const hotelModel = require('./hoteles.model');

module.exports.registrar = function(req,res){
    let nuevohotel = new hotelModel({
        nombre:req.body.nombre,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        dirreccion: req.body.dirreccion,
        correoCliente: req.body.correoCliente,
        correoReservacion: req.body.correoReservacion,
        telefonoCliente: req.body.telefonoCliente,
        telefonoReservacion: req.body.telefonoReservacion,
        foto: req.body.foto,
        activado:"0"
    });
    nuevohotel.save(function(error){
        if(error){
            res.json({success : false, msj : 'No se pudo registrar el hotel, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msj : 'El hotel se registró con éxito'});
        }
    });
};

module.exports.listar = function(req,res){
    hotelModel.find().then(
        function(hoteles){
            res.send(hoteles);
        }
    );
};

module.exports.filtrar = function(req, res){
    switch(req.body.tipo)
    {
        case "1":
        hotelModel.find(
            {
                "nombre":   {  
                                $regex: new RegExp(req.body.valor, "ig")
                            } 
            }
            ).then(
                function(hoteles){
                    res.send(hoteles);
                });
        break;

        case "2":
        hotelModel.find(
            {
                "correoCliente":   {  
                                $regex: new RegExp(req.body.valor, "ig")
                            } 
            }
            ).then(
                function(hoteles){
                    res.send(hoteles);
                });
        break;

        case "3":
        hotelModel.find(
            {
                "_id": req.body.valor
            }
            ).then(
                function(hoteles){
                    res.send(hoteles);
                });
        break;
    }
};

module.exports.actualizar = function (req, res) {
    hotelModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msj: 'No se ha actualizado: ' + handleError(err) });

            } else {
                res.json({ success: true, msj: 'Se ha actualizado correctamente.' });
            }
        });
};