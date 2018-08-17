'use strict';
//DEPENDENCIA
let mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    nombre:{type : String, require : true},
    cedula:{type : String, require : true},
    telefono:{type : String, require : true},
    correo:{type : String, required : true},
    foto:{ type: String, required: false },
    contrasena:{type : String, required : true}
});

module.exports = mongoose.model('Admin', adminSchema);