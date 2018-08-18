'use strict'

const BotonLogin = document.querySelector('#loginButton');
const InputCorreo = document.querySelector('#correo');
const InputContrasena = document.querySelector('#contrasena');
const baseUrl = window.location.protocol+'//'+window.location.hostname+':'+window.location.port;
const recuperar= document.querySelector('#recuperar');
const InputCorreoRecuperar= document.querySelector('#editCorreo');
const btnCancelar = document.querySelector('#Cancelar');
const btnEditar = document.querySelector('#btnEditar');

BotonLogin.addEventListener('click',login);
recuperar.addEventListener('click',cambiar);
btnCancelar.addEventListener('click',cancelar);
btnEditar.addEventListener('click',cambiarContrasena);


redireccion();


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
                    window.location.assign(baseUrl+"/public/estudianteIndex.html");
                    break;
 
                    case "2":
                    window.location.assign(baseUrl+"/public/profesorIndex.html");
                    break;
 
                    case "3":
                    window.location.assign(baseUrl+"/public/clienteIndex.html");
                    break;
                }
               }
           }
        }
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
                comprobacion=contrasenaEstudiante(respuesta['_id'],InputCorreoRecuperar.value);
                cancelar();
            break;

            case "2":
                comprobacion=contrasenaProfesor(respuesta['_id'],InputCorreoRecuperar.value);
                cancelar();
            break;

            case "3":
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

function redireccion() {
    let tipo =sessionStorage.getItem("tipo");
    switch(tipo){

        case "0":
        window.location.assign(baseUrl+"/public/adminIndex.html");
        break;

        case "1":
        window.location.assign(baseUrl+"/public/estudianteIndex.html");
        break;

        case "2":
        window.location.assign(baseUrl+"/public/profesorIndex.html");
        break;

        case "3":
        window.location.assign(baseUrl+"/public/clienteIndex.html");
        break;

        default:
        break;

    }
}