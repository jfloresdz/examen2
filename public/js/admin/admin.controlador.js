'use strict';

const baseUrl = window.location.protocol+'//'+window.location.hostname+':'+window.location.port;
const Salir = document.querySelector('#salir');


Salir.addEventListener('click',cerrarSesion);

Comprobar();
imprimirListaProyectos();

function Comprobar() {
    let tipo =sessionStorage.getItem("tipo");

    if(tipo!=0){
        window.location.assign(baseUrl+'/public/logIn.html');
    }else{
        userName.textContent=sessionStorage.getItem("nombre");
        currentFoto.src = sessionStorage.getItem("foto");
        cantidades();
    }
}

function cerrarSesion(){
    sessionStorage.clear();
    window.location.assign(baseUrl+'/public/logIn.html');
}

function imprimirListaProyectos(){
    let listaProyectos = obtenerListaProyectos();
    let tbody = document.querySelector('#table-users tbody');
    tbody.innerHTML = '';

    let comenzar=0;
    if(listaProyectos.length>5){
        comenzar=listaProyectos.length-5;
    }

    for(let i = comenzar; i < listaProyectos.length; i++){
        let fila = tbody.insertRow();
        
        let cnombre= fila.insertCell();
        let cempresa= fila.insertCell();
        let cfechaCreacion= fila.insertCell();
        let cestado= fila.insertCell();

        cnombre.innerHTML = listaProyectos[i]['nombre'];
        cempresa.innerHTML = listaProyectos[i]['empresa_nombre'];
        cfechaCreacion.innerHTML = listaProyectos[i]['fechaCreacion'];
        cestado.innerHTML = listaProyectos[i]['estado'];
    }
};

function cantidades() {
    let profesores = obtenerListaProfesores();
    let estudiantes = obtenerListaEstudiantes();
    let clientes = obtenerListaClientes();
    let proyectos = obtenerListaProyectos();

    document.querySelector('#Profesores').innerHTML="<span>"+profesores.length+"</span>Profesores";
    document.querySelector('#Estudiantes').innerHTML="<span>"+estudiantes.length+"</span>Estudiantes";
    document.querySelector('#Clientes').innerHTML="<span>"+clientes.length+"</span>Clientes";
    document.querySelector('#Proyectos').innerHTML="<span>"+proyectos.length+"</span>Proyectos";
}