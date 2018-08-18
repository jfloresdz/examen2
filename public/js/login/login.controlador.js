'use strict'

const BotonLogin = document.querySelector('#loginButton');
const InputCorreo = document.querySelector('#correo');
const InputContrasena = document.querySelector('#contrasena');
const baseUrl = window.location.protocol+'//'+window.location.hostname+':'+window.location.port;
const recuperar= document.querySelector('#recuperar');
const InputCorreoRecuperar= document.querySelector('#editCorreo');
const btnCancelar = document.querySelector('#Cancelar');
const btnEditar = document.querySelector('#btnEditar');

const primerNombre =document.querySelector('#primerNombre');
const segundoNombre =document.querySelector('#segundoNombre');
const primerApellido =document.querySelector('#primerApellido');
const segundoApellido =document.querySelector('#segundoApellido');
const cedula =document.querySelector('#cedula');
const correo =document.querySelector('#correoRe');
const contrasena =document.querySelector('#contrasenaRe');
const contrasena2 =document.querySelector('#contrasena2');
const foto =document.querySelector('#foto');
const fechaNaciemiento =document.querySelector('#fechaNaciemiento');
const sexo =document.querySelector('#sexo');


const registroShow = document.querySelector('#registroShow');
const btnRegistrar = document.querySelector('#btnRegistrar');
const btnCancelar2 = document.querySelector('#Cancelar2');

BotonLogin.addEventListener('click',login);
recuperar.addEventListener('click',cambiar);
registroShow.addEventListener('click',cambiar2);
btnCancelar.addEventListener('click',cancelar);
btnCancelar2.addEventListener('click',cancelar2);
btnEditar.addEventListener('click',cambiarContrasena);
btnRegistrar.addEventListener('click',registrar);


redireccion();
limpiar();

function login(){
    let bError = false;
    let respuesta = [];
    
        bError = validar();

        if(bError == true){
            toastr.warning('Por favor llene los campos');
        }else{
            respuesta=loginServicio(InputCorreo.value,InputContrasena.value);
           if(respuesta.length==0){
            toastr.error('Usuario o contrasena no validos');
           }else{
               if(respuesta['estado']==2){
                toastr.error('Usuario desactivado contacte al administrador');
               }else{
                sessionStorage.setItem("id",respuesta['_id']);
                sessionStorage.setItem("nombre",respuesta['nombre']);
                sessionStorage.setItem("tipo",respuesta['tipo']);
                sessionStorage.setItem("foto",respuesta['foto']);
                sessionStorage.setItem("activado",respuesta['estado']);
                toastr.success('Bienvenid@ '+respuesta['nombre']);
 
                switch(respuesta['tipo']){
                    case "0":
                    window.location.assign(baseUrl+"/public/adminIndex.html");
                    break;
 
                    case "1":
                    window.location.assign(baseUrl+"/public/clienteIndex.html");
                    break;
                }
               }
           }
        }
}


function registrar(){
    let cliente =[];
    cliente.push(
        primerNombre.value,
        segundoNombre.value,
        primerApellido.value,
        segundoApellido.value,
        cedula.value,
        correoRe.value,
        contrasenaRe.value,
        foto.value,
        fechaNaciemiento.value,
        sexo.value
    );

    let respuesta = validarRegistro();

    if(respuesta){
        let enviar = registrarCliente(cliente);
        if(enviar.success){
            toastr.success(enviar.msj);
            cancelar2();
        }else{
            toastr.error(enviar.msj);
        }
    }
}


function validarRegistro() {
    let resultado = true;

    if(primerNombre.value==null || primerNombre.value==""){
        resultado=false;
        toastr.warning("Primer Nombre es obligatorio");
    }
    
    if(primerApellido.value==null || primerApellido.value==""){
        resultado=false;
        toastr.warning("Primer Apellido es obligatorio");
    }

    if(cedula.value==null || cedula.value==""){
        resultado=false;
        toastr.warning("Cedula es obligatorio");
    }

    if(correoRe.value==null || correoRe.value==""){
        resultado=false;
        toastr.warning("Correo es obligatorio");
    }else{
        let revisarCorreo = comprobarCorreo(correoRe.value);
        if(revisarCorreo['_result']){
            toastr.error('Correo se encuentra ya registrado');
        }
    }
    
    if(contrasenaRe.value==null || contrasenaRe.value==""){
        resultado=false;
        toastr.warning("Contrasena es obligatorio");
    }else{
        if(contrasenaRe.value!=contrasena2.value){
            resultado=false;
        toastr.warning("Contrasenas no coinciden");
        }
    }

    if(fechaNaciemiento.value==null || fechaNaciemiento.value==""){
        resultado=false;
        toastr.warning("Correo es obligatorio");
    }

    return resultado;
}

function limpiar(){
        primerNombre.value=null;
        segundoNombre.value=null;
        primerApellido.value=null;
        segundoApellido.value=null;
        cedula.value=null;
        correoRe.value=null;
        contrasenaRe.value=null;
        contrasena2.value=null;
        foto.value='http://res.cloudinary.com/jfloresd/image/upload/v1534559146/img_avatar_iukpzx.png';
        fechaNaciemiento.value=null;
        sexo.value="M";
        document.querySelector('#currentFoto').src='img/user.png';
}

function validar() {
    let resultado = false

    if(InputContrasena.value =='' || InputContrasena ==null || InputCorreo == '' || InputCorreo == null ){
        resultado = true
    }

    return resultado;
}

function cambiar() {
    $('.wrap').slideUp();
    $('.edit-box').slideDown();
}

function cambiar2() {
    $('.wrap').slideUp();
    $('.registro').slideDown();
}

function cambiarContrasena(){
    let comprobacion=[];
    let respuesta = comprobarCorreo(InputCorreoRecuperar.value);
    if(respuesta['_result']){
        switch(respuesta['tipo']){
            case "0":
                comprobacion=contrasenaAdmin(respuesta['_id'],InputCorreoRecuperar.value);
                cancelar();
            break;

            case "1":
                comprobacion=contrasenaCliente(respuesta['_id'],InputCorreoRecuperar.value);
                cancelar();
            break;

        }
        toastr.success(comprobacion['msj']);
    }else{
        toastr.error('correo invalido');
    }
}


function cancelar() {
    $('.edit-box').slideUp();
    $('.wrap').slideDown();
}

function cancelar2() {
    $('.registro').slideUp();
    $('.wrap').slideDown();
    limpiar();
}


function redireccion() {
    let tipo =sessionStorage.getItem("tipo");
    switch(tipo){

        case "0":
        window.location.assign(baseUrl+"/public/adminIndex.html");
        break;

        case "1":
        window.location.assign(baseUrl+"/public/clienteIndex.html");
        break;

        default:
        break;

    }
}