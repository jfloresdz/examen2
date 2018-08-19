'use strict'
let mongoose = require('mongoose');

let calificaion= mongoose.Schema({
    id_user:{type: Number, required:true},
    comida:{type: Number, required:true},
    calidad:{type: Number, required:true},
    habitacion:{type: Number, required:true},
    infraestructura:{type: Number, required:true},
    limpieza:{type: Number, required:true}
});

let hotelSchema = mongoose.Schema({
    nombre:{type: String, required:true},
    latitud: { type: String, required: true },
    longitud: { type: String, required: true },
    provincia: { type: String, required: false },
    canton: { type: String, required: false },
    distrito: { type: String, required: false },
    dirreccion: { type: String, required: true },
    correoCliente: { type: String, required: true },
    correoReservacion: { type: String, required: true },
    telefonoCliente: { type: String, required: true },
    telefonoReservacion: { type: String, required: true },
    foto:{ type: String, required: true },
    calificaciones:[calificaion],
    activado:{type : String, required : true}
});

module.exports = mongoose.model('hotel', hotelSchema);