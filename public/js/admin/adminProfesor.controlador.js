'use strict';

const baseUrl = window.location.protocol+'//'+window.location.hostname+':'+window.location.port;
const Salir = document.querySelector('#salir');

const nombre = document.querySelector('#nombre');
const cedula = document.querySelector('#cedula');
const telefono = document.querySelector('#telefono');
const correo = document.querySelector('#correo');
const profesion = document.querySelector('#profesion');
const experiencia = document.querySelector('#experiencia');
const fechaNacimiento = document.querySelector('#fechaNacimiento');
const foto = document.querySelector('#foto');
const direccion= document.querySelector('#direccion');
const Registrar = document.querySelector('#registrar');

const editNombre = document.querySelector('#editNombre');
const editCedula = document.querySelector('#editCedula');
const editTelefono = document.querySelector('#editTelefono');
const editCorreo = document.querySelector('#editCorreo');
const editProfesion = document.querySelector('#editProfesion');
const editExperiencia = document.querySelector('#editExperiencia');
const editFechaNacimiento = document.querySelector('#editFechaNacimiento');
const editFoto = document.querySelector('#editFoto');
const editDireccion= document.querySelector('#editDireccion');
const editId = document.querySelector('#editId');
const btnEditar = document.querySelector('#btnEditar');
const btnCancelar = document.querySelector('#Cancelar');

const Buscar =document.querySelector('#buscar');
const btnBuscar=document.querySelector('#btnBuscar');



Registrar.addEventListener('click',registrarFormulario);
btnBuscar.addEventListener('click',buscarProfesor);
btnEditar.addEventListener('click',editarFormulario);
btnCancelar.addEventListener('click',cancelar);
Salir.addEventListener('click',cerrarSesion);


Comprobar();
imprimirListaProfesores();


function Comprobar() {
    let tipo =sessionStorage.getItem("tipo");

    if(tipo!=0){
        window.location.assign(baseUrl+'/public/logIn.html');
    }
}

function cerrarSesion(){
    sessionStorage.clear();
    window.location.assign(baseUrl+'/public/logIn.html');
}

function registrarFormulario() {
    let Profesor=[];
    Profesor.push(
        nombre.value,
        cedula.value,
        telefono.value,
        correo.value,
        profesion.value,
        experiencia.value,
        fechaNacimiento.value,
        foto.value,
        direccion.value
    );

    let validar = validarFormulario();

    if(validar){
        toastr.warning('Por favor llene los campos');
    }else{
        let respuesta=registrarProfesor(Profesor);
        if(respuesta.success == false){
            toastr.error(respuesta.msj);
        }else{
            toastr.success(respuesta.msj);
        }
    }

}

function validarFormulario(){
    let respuesta=false;

    if(nombre.value== null || nombre.value==""){
        respuesta=true;
    }

    if (cedula.value == null || cedula.value==""){
        respuesta=true;
    }

    if (telefono.value == null || telefono.value==""){
        respuesta=true;
    }

    if (correo.value == null || correo.value ==""){
        respuesta=true;
    }

    return respuesta;
}

function imprimirListaProfesores(){
    let listaProfesores = obtenerListaProfesores();
    let tbody = document.querySelector('#table-users tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaProfesores.length; i++){
        let fila = tbody.insertRow();

        let cnombre= fila.insertCell();
        let ccedula= fila.insertCell();
        let ctelefono= fila.insertCell();
        let ccorreo= fila.insertCell();
        let editar = fila.insertCell();
        
        cnombre.innerHTML = listaProfesores[i]['nombre'];
        ccedula.innerHTML = listaProfesores[i]['cedula'];
        ctelefono.innerHTML = listaProfesores[i]['telefono'];
        ccorreo.innerHTML = listaProfesores[i]['correo'];
        editar.innerHTML = '<button type="button" class="editButton" id="'+listaProfesores[i]['_id']+'"><i class="fas fa-edit"></i></button>';

        document.getElementById(listaProfesores[i]['_id']).onclick= function() {
            let Profesor = filtrarProfesores("3",this.id);
            editNombre.value=Profesor[0]['nombre'];
            editCedula.value=Profesor[0]['cedula'];
            editTelefono.value=Profesor[0]['telefono'];
            editCorreo.value=Profesor[0]['correo'];
            editProfesion.value=Profesor[0]['profesion'];
            editExperiencia.value=Profesor[0]['experiencia'];
            editFechaNacimiento.value=Profesor[0]['fechaNacimiento'];
            editFoto.value=Profesor[0]['foto'];
            editDireccion.value=Profesor[0]['direccion'];
            editId.value=this.id;
            document.querySelector('#editFotoShow').src= editFoto.value;
            $('.tab').slideUp();
            $('.edit-box').slideDown();
        }
        
    }

};

function buscarProfesor(){
    let listaProfesores = filtrarProfesores("1",Buscar.value);
    let tbody = document.querySelector('#table-users tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaProfesores.length; i++){
        let fila = tbody.insertRow();

        let cnombre= fila.insertCell();
        let ccedula= fila.insertCell();
        let ctelefono= fila.insertCell();
        let ccorreo= fila.insertCell();
        let editar = fila.insertCell();
        
        cnombre.innerHTML = listaProfesores[i]['nombre'];
        ccedula.innerHTML = listaProfesores[i]['cedula'];
        ctelefono.innerHTML = listaProfesores[i]['telefono'];
        ccorreo.innerHTML = listaProfesores[i]['correo'];
        editar.innerHTML = '<button type="button" class="editButton" id="'+listaProfesores[i]['_id']+'"><i class="fas fa-edit"></i></button>';

        document.getElementById(listaProfesores[i]['_id']).onclick= function() {
            let Profesor = filtrarProfesores("3",this.id);
            editNombre.value=Profesor[0]['nombre'];
            editCedula.value=Profesor[0]['cedula'];
            editTelefono.value=Profesor[0]['telefono'];
            editCorreo.value=Profesor[0]['correo'];
            editProfesion.value=Profesor[0]['profesion'];
            editExperiencia.value=Profesor[0]['experiencia'];
            editFechaNacimiento.value=Profesor[0]['fechaNacimiento'];
            editFoto.value=Profesor[0]['foto'];
            editDireccion.value=Profesor[0]['direccion'];
            editId.value=this.id;
            document.querySelector('#editFotoShow').src= editFoto.value;
            $('.tab').slideUp();
            $('.edit-box').slideDown();
        }
        
    }

};


function editarFormulario(){
    let Profesor=[];
    Profesor.push(
        editNombre.value,
        editCedula.value,
        editTelefono.value,
        editCorreo.value,
        editProfesion.value,
        editExperiencia.value,
        editFechaNacimiento.value,
        editFoto.value,
        editDireccion.value
    );

    let validar = validarEditar();

    if(validar){
        toastr.warning('Por favor llene los campos');
    }else{
        let respuesta=actualizarProfesor(editId.value,Profesor);
        if(respuesta.success == false){
            toastr.error(respuesta.msj);
            $('.edit-box').slideUp();
            $('.tab').slideDown();
        }else{
            toastr.success(respuesta.msj);
            imprimirListaProfesores();
            $('.edit-box').slideUp();
            $('.tab').slideDown();
        }
    }
}

function validarEditar(){
    let respuesta=false;
    if(editNombre.value== null || editNombre.value==""){
        respuesta=true;
    }

    if (editCedula.value == null || editCedula.value==""){
        respuesta=true;
    }

    if (editTelefono.value == null || editTelefono.value==""){
        respuesta=true;
    }

    if (editCorreo.value == null || editCorreo.value ==""){
        respuesta=true;
    }
    return respuesta;
}


function cancelar() {
    toastr.warning('Editar cancelado');
    $('.edit-box').slideUp();
    $('.tab').slideDown();
}
