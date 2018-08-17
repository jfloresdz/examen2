'use strict';

function registrarEstudiante(estudiante){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarEstudiante',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            nombre: estudiante[0],
            cedula: estudiante[1],
            telefono: estudiante[2],
            correo: estudiante[3],
            fechaNc: estudiante[4],
            direccion: estudiante[5],
            contactoEmer: estudiante[6],
            telEmer: estudiante[7],
            foto: estudiante[8],
            contrasena: Math.random().toString(36).substring(7)
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    

      peticion.fail(function(response){
       
      });

      console.log(respuesta);
      return respuesta;
}

function actualizarEstudiante(id_user,estudiante){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarEstudiante',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id:id_user,
            nombre: estudiante[0],
            cedula: estudiante[1],
            telefono: estudiante[2],
            correo: estudiante[3],
            fechaNc: estudiante[4],
            direccion: estudiante[5],
            contactoEmer: estudiante[6],
            telEmer: estudiante[7],
            foto: estudiante[8]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      console.log(respuesta);
      return respuesta;
}



function obtenerListaEstudiantes(){
    let listaEstudiantes = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarEstudiantes',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return listaEstudiantes;
}


function filtrarEstudiantes(cTipo,cValor){
    let listaEstudiantes = [];
  
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/filtrarEstudiantes',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            tipo: cTipo,
            valor: cValor
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
  
      return respuesta;
    
    return listaEstudiantes;
  }


function registrarCliente(cliente){
    let respuesta = '';
    let informacion = {
        nombre: cliente[0],
        cedula: cliente[1],
        telefono: cliente[2],
        correo: cliente[3],
        contacto:{
            nombre:cliente[4],
            correo:cliente[5],
            telefono:cliente[6]
        },
        foto: cliente[7],
        latitud:cliente[8],
        longitud:cliente[9],
        contrasena: Math.random().toString(36).substring(7)
    }
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarCliente',
        type : 'post',
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        async : false,
        data:JSON.stringify(informacion)
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    

      peticion.fail(function(response){
       
      });

      console.log(respuesta);
      return respuesta;
}


function actualizarCliente(id_user,cliente){
    let respuesta = '';
    let informacion = {
        _id:id_user,
        nombre: cliente[0],
        cedula: cliente[1],
        telefono: cliente[2],
        correo: cliente[3],
        contacto:{
            nombre:cliente[4],
            correo:cliente[5],
            telefono:cliente[6]
        },
        foto: cliente[7]
    }
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarCliente',
        type : 'post',
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        async : false,
        data:JSON.stringify(informacion)
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    

      peticion.fail(function(response){
       
      });

      console.log(respuesta);
      return respuesta;
}


function obtenerListaClientes(){
    let listaClientes = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarClientes',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return listaClientes;
}


function filtrarClientes(cTipo,cValor){
    let listaClientes = [];
  
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/filtrarClientes',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            tipo: cTipo,
            valor: cValor
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
  
      return respuesta;
    
    return listaClientes;
}

function registrarProfesor(profesor){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarProfesor',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            nombre:profesor[0],
            cedula:profesor[1],
            telefono:profesor[2],
            correo:profesor[3],
            profesion:profesor[4],
            experiencia:profesor[5],
            fechaNacimiento:profesor[6],
            foto:profesor[7],
            direccion:profesor[8],
            contrasena: Math.random().toString(36).substring(7)
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    

      peticion.fail(function(response){
       
      });

      console.log(respuesta);
      return respuesta;
}

function actualizarProfesor(id_user,profesor){
    let respuesta = '';
    let informacion = {
        _id:id_user,
        nombre:profesor[0],
        cedula:profesor[1],
        telefono:profesor[2],
        correo:profesor[3],
        profesion:profesor[4],
        experiencia:profesor[5],
        fechaNacimiento:profesor[6],
        foto:profesor[7],
        direccion:profesor[8]
    }
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarProfesor',
        type : 'post',
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        async : false,
        data:JSON.stringify(informacion)
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    

      peticion.fail(function(response){
       
      });

      console.log(respuesta);
      return respuesta;
}

function obtenerListaProfesores(){
    let listaProfesores = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarProfesores',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return listaProfesores;
}


function filtrarProfesores(cTipo,cValor){
    let listaProfesores = [];
  
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/filtrarProfesores',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            tipo: cTipo,
            valor: cValor
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
  
      return respuesta;
    
    return listaProfesores;
}

function registrarProyecto(proyecto){
    let respuesta = '';
    let informacion = {
        nombre:proyecto[0],
        empresa:proyecto[1],
        descripcion:proyecto[2],
        equipo:[
            {
                id_user:proyecto[3],
                rol :"1",
                estado :"1"
            },
            {
                id_user:proyecto[4],
                rol :"1",
                estado :"1"
            }
        ],
        empresa_nombre:proyecto[5]
    }

    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarProyecto',
        type : 'post',
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        async : false,
        data:JSON.stringify(informacion)
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    

      peticion.fail(function(response){
       
      });

      console.log(respuesta);
      return respuesta;
}

function obtenerListaProyectos(){
    let listaProyectos = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarProyectos',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
    
    return listaProyectos;
}


function filtrarProyectos(cTipo,cValor){
    let listaProyectos = [];
  
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/filtrarProyectos',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            tipo: cTipo,
            valor: cValor
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
  
      return respuesta;
    
    return listaProyectos;
}


function actualizarProyecto(id_proyect,proyecto){
    let respuesta = '';
    let informacion = {
        _id:id_proyect,
        nombre:proyecto[0],
        empresa:proyecto[1],
        descripcion:proyecto[2],
        equipo:[
            {
                id_user:proyecto[3],
                rol :"1",
                estado :"1"
            },
            {
                id_user:proyecto[4],
                rol :"1",
                estado :"1"
            }
        ],
        empresa_nombre:proyecto[5]
    }

    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarProyecto',
        type : 'post',
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        async : false,
        data:JSON.stringify(informacion)
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    

      peticion.fail(function(response){
       
      });

      console.log(respuesta);
      return respuesta;
}