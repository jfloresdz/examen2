'use strict';

const baseUrl = window.location.protocol+'//'+window.location.hostname+':'+window.location.port;
const Salir = document.querySelector('#salir');

const registrarShow = document.querySelector('#registrarShow');
const registrar = document.querySelector('#registrar');
const cancelar = document.querySelector('#cancelar');
const Buscar =document.querySelector('#buscar');
const btnBuscar =document.querySelector('#btnBuscar');

const nombre= document.querySelector('#nombre');
const correo= document.querySelector('#correo');
const telefono= document.querySelector('#telefono');
const correo2= document.querySelector('#correo2');
const telefono2= document.querySelector('#telefono2');
const foto= document.querySelector('#foto');
const latitud= document.querySelector('#latitud');
const longitud= document.querySelector('#longitud');
const direccion= document.querySelector('#direccion');
const idHotel= document.querySelector('#idHotel');
const provincia = document.querySelector('#provincia');
const canton = document.querySelector('#canton');
const distrito = document.querySelector('#distrito');

Salir.addEventListener('click',cerrarSesion);
registrarShow.addEventListener('click',cambiar);
registrar.addEventListener('click',registrarForm)
cancelar.addEventListener('click',cambiar2);
btnBuscar.addEventListener('click',imprimirListaHoteles2);
provincia.addEventListener("change",cambiarProvincia);
canton.addEventListener("change",cambiarCanton);

Comprobar();

function Comprobar() {
    let tipo =sessionStorage.getItem("tipo");

    if(tipo!=0){
        window.location.assign(baseUrl+'/public/logIn.html');
    }else{    
    imprimirListaHoteles();
    limpiarForm();
    }
}

function cerrarSesion(){
    sessionStorage.clear();
    window.location.assign(baseUrl+'/public/logIn.html');
}

function imprimirListaHoteles(){
    let listaHoteles = obtenerlistaHoteles();
    let tbody = document.querySelector('#table-hoteles tbody');
    tbody.innerHTML = '';

    let comenzar=0;
 

    for(let i = comenzar; i < listaHoteles.length; i++){
        let fila = tbody.insertRow();
        
        let cfoto= fila.insertCell();
        let cnombre= fila.insertCell();
        let editar= fila.insertCell();
        let eliminar= fila.insertCell();

        cfoto.innerHTML = '<img class="img_est" src="'+listaHoteles[i]['foto']+'" />';
        cnombre.innerHTML = listaHoteles[i]['nombre'];
        editar.innerHTML = '<button type="button" class="editButton" id="'+listaHoteles[i]['_id']+'"><i class="fas fa-eye"></i></button>';
        eliminar.innerHTML ='<button type="button" class="editButton" id="'+listaHoteles[i]['_id']+'e"><i class="fas fa-eye"></i></button>';
    
        document.getElementById(listaHoteles[i]['_id']).onclick= function() {
            obtenerSeleccionado(this.id);
        }
    }
};

function imprimirListaHoteles2(){
    let listaHoteles = filtrarHoteles("1",Buscar.value);
    let tbody = document.querySelector('#table-hoteles tbody');
    tbody.innerHTML = '';

    let comenzar=0;

    for(let i = comenzar; i < listaHoteles.length; i++){
        let fila = tbody.insertRow();
        
        let cfoto= fila.insertCell();
        let cnombre= fila.insertCell();
        let editar= fila.insertCell();
        let eliminar= fila.insertCell();

        cfoto.innerHTML = '<img class="img_est" src="'+listaHoteles[i]['foto']+'" />';
        cnombre.innerHTML = listaHoteles[i]['nombre'];
        editar.innerHTML = '<button type="button" class="editButton" id="'+listaHoteles[i]['_id']+'"><i class="fas fa-eye"></i></button>';
        eliminar.innerHTML ='<button type="button" class="editButton" id="'+listaHoteles[i]['_id']+'e"><i class="fas fa-eye"></i></button>';
    
        document.getElementById(listaHoteles[i]['_id']).onclick= function() {
            obtenerSeleccionado(this.id);
        }
    }
};

function obtenerSeleccionado(id_Cliente){
    let hoteles = filtrarHoteles("3",id_Cliente);
    nombre.value=hoteles[0]['nombre'];
    correo.value=hoteles[0]['correoCliente'];
    telefono.value=hoteles[0]['telefonoCliente'];
    correo2.value=hoteles[0]['correoReservacion'];
    telefono2.value=hoteles[0]['telefonoReservacion'];
    foto.value=hoteles[0]['foto'];
    latitud.value=hoteles[0]['latitud'];
    longitud.value=hoteles[0]['longitud'];
    direccion.value=hoteles[0]['dirreccion'];
    idHotel.value=hoteles[0]['_id'];
    provincia.value=hoteles[0]['provincia'];
    cambiarProvincia2(hoteles[0]['canton'],hoteles[0]['distrito'])
    document.querySelector('#currentFoto').src=hoteles[0]['foto'];
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

function selectProvincias(){
    let provincias = obtenerProvincias();
    let option='';

    while (provincia.firstChild) {
        provincia.removeChild(provincia.firstChild);
    }

    for (let key in provincias) {
        option = document.createElement('option');
        option.setAttribute('value', key);
        option.appendChild(document.createTextNode(provincias[key]));
        provincia.appendChild(option);
    }

    let cantones = obtenerCanton(provincia.value);

    while (canton.firstChild) {
        canton.removeChild(canton.firstChild);
    }
    for (let key in cantones) {
        option = document.createElement('option');
        option.setAttribute('value', key);
        option.appendChild(document.createTextNode(cantones[key]));
        canton.appendChild(option);
    }

    let distritos = obtenerDistrito(provincia.value,canton.value);

    while (distrito.firstChild) {
        distrito.removeChild(distrito.firstChild);
    }

    for (let key in distritos) {
        option = document.createElement('option');
        option.setAttribute('value', key);
        option.appendChild(document.createTextNode(distritos[key]));
        distrito.appendChild(option);
    }  
}

function cambiarProvincia(){
    let cantones = obtenerCanton(provincia.value);
    let option='';
    while (canton.firstChild) {
        canton.removeChild(canton.firstChild);
    }

    for (let key in cantones) {
        option = document.createElement('option');
        option.setAttribute('value', key);
        option.appendChild(document.createTextNode(cantones[key]));
        canton.appendChild(option);
    }

    let distritos = obtenerDistrito(provincia.value,canton.value);

    while (distrito.firstChild) {
        distrito.removeChild(distrito.firstChild);
    }

    for (let key in distritos) {
        option = document.createElement('option');
        option.setAttribute('value', key);
        option.appendChild(document.createTextNode(distritos[key]));
        distrito.appendChild(option);
    }  
}

function cambiarProvincia2(c,d){
    let cantones = obtenerCanton(provincia.value);
    let option='';
    while (canton.firstChild) {
        canton.removeChild(canton.firstChild);
    }

    for (let key in cantones){
        option = document.createElement('option');
        option.setAttribute('value', key);
        option.appendChild(document.createTextNode(cantones[key]));
        canton.appendChild(option);
    }

    canton.value=c;

    let distritos = obtenerDistrito(provincia.value,canton.value);

    while (distrito.firstChild) {
        distrito.removeChild(distrito.firstChild);
    }

    for (let key in distritos) {
        option = document.createElement('option');
        option.setAttribute('value', key);
        option.appendChild(document.createTextNode(distritos[key]));
        distrito.appendChild(option);
    }  

    distrito.value=d;
}

function cambiarCanton(){
    let distritos = obtenerDistrito(provincia.value,canton.value);
    let option='';

    while (distrito.firstChild) {
        distrito.removeChild(distrito.firstChild);
    }

    for (let key in distritos) {
        option = document.createElement('option');
        option.setAttribute('value', key);
        option.appendChild(document.createTextNode(distritos[key]));
        distrito.appendChild(option);
    } 
}

function limpiarForm(){
    nombre.value=null;
    correo.value=null;
    telefono.value=null;
    correo2.value=null;
    telefono2.value=null;
    foto.value="http://res.cloudinary.com/jfloresd/image/upload/v1534559146/img_avatar_iukpzx.png";
    latitud.value=null;
    longitud.value=null;
    direccion.value=null;
    idHotel.value=null;
    selectProvincias();
    document.querySelector('#currentFoto').src='img/user.png';
}

function registrarForm(){
    let form=[];

    form.push(
        nombre.value,
        latitud.value,
        longitud.value,
        provincia.value,
        canton.value,
        distrito.value,
        direccion.value,
        correo.value,
        correo2.value,
        telefono.value,
        telefono2.value,
        foto.value
    );

    let validacion=validar();

    if(validacion){
        if(idHotel.value==""){
            let respuesta=registrarHotel(form);
            if(respuesta.success){
                toastr.success(respuesta.msj);
                cambiar2();
            }else{
                toastr.error(respuesta.msj);
            }
        }else{
            let respuesta2=actualizarHotel(idHotel.value,form);
            if(respuesta2.success){
                toastr.success(respuesta2.msj);
                cambiar2();
                imprimirListaHoteles();
            }else{
                toastr.error(respuesta2.msj);
            }
        }
    }
}

function validar(){
    let resultado = true;

    if(nombre.value==null || nombre.value==""){
        resultado=false;
        toastr.warning("Nombre es obligatorio");
    }

    if(latitud.value==null || latitud.value==""){
        resultado=false;
        toastr.warning("latitud es obligatorio");
    }

    if(longitud.value==null || longitud.value==""){
        resultado=false;
        toastr.warning("longitud es obligatorio");
    }

    if(direccion.value==null || direccion.value==""){
        resultado=false;
        toastr.warning("Direccion es obligatorio");
    }

    if(correo.value==null || correo.value==""){
        resultado=false;
        toastr.warning("Correo Sevicio es obligatorio");
    }

    if(correo2.value==null || correo2.value==""){
        resultado=false;
        toastr.warning("Correo Reservacion es obligatorio");
    }

    if(telefono.value==null || telefono.value==""){
        resultado=false;
        toastr.warning("Telefono Sevicio es obligatorio");
    }

    if(telefono2.value==null || telefono2.value==""){
        resultado=false;
        toastr.warning("Telefono Reservacion es obligatorio");
    }

    return resultado;
}