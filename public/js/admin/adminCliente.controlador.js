'use strict';

const baseUrl = window.location.protocol+'//'+window.location.hostname+':'+window.location.port;
const Salir = document.querySelector('#salir');

const registrar = document.querySelector('#registrar');
const cancelar = document.querySelector('#cancelar');
const Buscar =document.querySelector('#buscar');
const btnBuscar =document.querySelector('#btnBuscar');

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
const idCliente=document.querySelector('#idCliente');

Salir.addEventListener('click',cerrarSesion);
registrar.addEventListener('click',registrarForm)
cancelar.addEventListener('click',cambiar2);
btnBuscar.addEventListener('click',imprimirListaClientes2);

Comprobar();

function Comprobar() {
    let tipo =sessionStorage.getItem("tipo");

    if(tipo!=0){
        window.location.assign(baseUrl+'/public/logIn.html');
    }else{    
    imprimirListaClientes();
    limpiarForm();
    }
}

function cerrarSesion(){
    sessionStorage.clear();
    window.location.assign(baseUrl+'/public/logIn.html');
}

function imprimirListaClientes(){
    let listaClientes = obtenerListaClientes();
    let tbody = document.querySelector('#table-Clientes tbody');
    tbody.innerHTML = '';


    for(let i = 0; i < listaClientes.length; i++){
        let fila = tbody.insertRow();
        
        let cfoto= fila.insertCell();
        let cnombre= fila.insertCell();
        let capellido= fila.insertCell();
        let ccedula= fila.insertCell();
        let editar= fila.insertCell();
        let eliminar= fila.insertCell();

        cfoto.innerHTML = '<img class="img_est" src="'+listaClientes[i]['foto']+'" />';
        cnombre.innerHTML = listaClientes[i]['primerNombre'];
        capellido.innerHTML= listaClientes[i]['primerApellido'];
        ccedula.innerHTML= listaClientes[i]['cedula'];
        editar.innerHTML = '<button type="button" class="editButton" id="'+listaClientes[i]['_id']+'"><i class="fas fa-eye"></i></button>';
        eliminar.innerHTML ='<button type="button" class="editButton" id="'+listaClientes[i]['_id']+'e"><i class="fas fa-eye"></i></button>';
    
        document.getElementById(listaClientes[i]['_id']).onclick= function() {
            obtenerSeleccionado(this.id);
        }
    }
};

function imprimirListaClientes2(){
    let listaClientes = filtrarClientes("1",Buscar.value);
    let tbody = document.querySelector('#table-Clientes tbody');
    tbody.innerHTML = '';


    for(let i = 0; i < listaClientes.length; i++){
        let fila = tbody.insertRow();
        
        let cfoto= fila.insertCell();
        let cnombre= fila.insertCell();
        let capellido= fila.insertCell();
        let ccedula= fila.insertCell();
        let editar= fila.insertCell();
        let eliminar= fila.insertCell();

        cfoto.innerHTML = '<img class="img_est" src="'+listaClientes[i]['foto']+'" />';
        cnombre.innerHTML = listaClientes[i]['primerNombre'];
        capellido.innerHTML= listaClientes[i]['primerApellido'];
        ccedula.innerHTML= listaClientes[i]['cedula'];
        editar.innerHTML = '<button type="button" class="editButton" id="'+listaClientes[i]['_id']+'"><i class="fas fa-eye"></i></button>';
        eliminar.innerHTML ='<button type="button" class="editButton" id="'+listaClientes[i]['_id']+'e"><i class="fas fa-eye"></i></button>';
    
        document.getElementById(listaClientes[i]['_id']).onclick= function() {
            obtenerSeleccionado(this.id);
        }
    }
};

function obtenerSeleccionado(id_Cliente){
    let clientes = filtrarClientes("3",id_Cliente);
    primerNombre.value=clientes[0]['primerNombre'];
    segundoNombre.value=clientes[0]['segundoNombre'];
    primerApellido.value=clientes[0]['primerApellido'];
    segundoApellido.value=clientes[0]['segundoApellido'];
    cedula.value=clientes[0]['cedula'];
    correoRe.value=clientes[0]['correo'];
    contrasenaRe.value=clientes[0]['contrasena'];
    contrasena2.value=clientes[0]['contrasena'];
    foto.value=clientes[0]['foto'];
    fechaNaciemiento.value=clientes[0]['fechaNaciemiento'];
    sexo.value=clientes[0]['sexo'];
    idCliente.value=id_Cliente;
    document.querySelector('#currentFoto').src=clientes[0]['foto'];
    cambiar();
}

function cambiar() {
    $('#box1').slideUp();
    $('.edit-box').slideDown();
}

function cambiar2() {
    $('.edit-box ').slideUp();
    $('#box1').slideDown();
    limpiarForm();
}

function limpiarForm(){
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

function registrarForm(){
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

    let validacion=validar();

    if(validacion){
            let respuesta2=actualizarCliente(idCliente.value,cliente);
            if(respuesta2.success){
                toastr.success(respuesta2.msj);
                cambiar2();
                imprimirListaClientes();
            }else{
                toastr.error(respuesta2.msj);
            }
    }
}

function validar(){
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