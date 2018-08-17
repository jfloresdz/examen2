'use strict'
let mongoose = require('mongoose');

let clienteSchema = mongoose.Schema({
    primerNombre:{type: String, required:true},
    segundoNombre:{type: String, required:false},
    primerApellido:{type: String, required:true},
    segundoApellido:{type: String, required:false},
    cedula: { type: Number, required: true },
    correo: { type: String, required: true },
    contrasena: { type: String, required: true },
    foto:{ type: String, required: true },
    fechaNaciemiento:{ type: String, required: true },
    sexo:{type: String, required:true},
    activado:{type : String, required : true}
});

module.exports = mongoose.model('Cliente', clienteSchema);