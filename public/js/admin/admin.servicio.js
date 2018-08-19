'use strict';

function registrarHotel(hotel){
    let respuesta = '';

    let informacion = {
        nombre:hotel[0],
        latitud:hotel[1],
        longitud:hotel[2],
        provincia:hotel[3],
        canton:hotel[4],
        distrito:hotel[5],
        dirreccion:hotel[6],
        correoCliente:hotel[7],
        correoReservacion:hotel[8],
        telefonoCliente:hotel[9],
        telefonoReservacion:hotel[10],
        foto:hotel[11]
    }

    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrarhotel',
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

function actualizarHotel(id_user,hotel){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarhotel',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id:id_user,
            nombre:hotel[0],
            latitud:hotel[1],
            longitud:hotel[2],
            provincia:hotel[3],
            canton:hotel[4],
            distrito:hotel[5],
            dirreccion:hotel[6],
            correoCliente:hotel[7],
            correoReservacion:hotel[8],
            telefonoCliente:hotel[9],
            telefonoReservacion:hotel[10],
            foto:hotel[11]
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



function obtenerlistaHoteles(){
    let listaHoteles = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listarhoteles',
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
    
    return listaHoteles;
}


function filtrarHoteles(cTipo,cValor){
    let listaHoteles = [];
  
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/filtrarhoteles',
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
    
    return listaHoteles;
  }


function actualizarCliente(id_user,cliente){
    let respuesta = '';

    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizarCliente',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id:id_user,
        primerNombre: cliente[0],
        segundoNombre: cliente[1],
        primerApellido: cliente[2],
        segundoApellido: cliente[3],
        cedula: cliente[4],
        correo: cliente[5],
        contrasena: cliente[6],
        foto: cliente[7],
        fechaNaciemiento: cliente[8],
        sexo: cliente[9]
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

function obtenerProvincias(){
  
    let respuesta = '';
    let peticion = $.ajax({
        url : 'https://ubicaciones.paginasweb.cr/provincias.json',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
  
      return respuesta;
}

function obtenerCanton(dato){
  
    let respuesta = '';
    let peticion = $.ajax({
        url : 'https://ubicaciones.paginasweb.cr/provincia/'+dato+'/cantones.json',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
  
      return respuesta;
}

function obtenerDistrito(dato,dato2){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'https://ubicaciones.paginasweb.cr/provincia/'+dato+'/canton/'+dato2+'/distritos.json',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
  
      return respuesta;
}