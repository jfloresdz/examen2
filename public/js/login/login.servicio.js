'use strict'

function loginServicio(InputCorreo,InputContrasena){
    let respuesta = [];
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/login',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{          
              correo : InputCorreo,
              contrasena : InputContrasena
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

function comprobarCorreo(InputCorreo){
      let respuesta = [];
      let peticion = $.ajax({
          url : 'http://localhost:4000/api/comprobarCorreo',
          type : 'post',
          contentType : 'application/x-www-form-urlencoded; charset=utf-8',
          dataType : 'json',
          async : false,
          data:{          
                correo : InputCorreo
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

  function contrasenaCliente(idUser,InputCorreo){
      let respuesta = [];
      let peticion = $.ajax({
          url : 'http://localhost:4000/api/contrasenaAdmin',
          type : 'post',
          contentType : 'application/x-www-form-urlencoded; charset=utf-8',
          dataType : 'json',
          async : false,
          data:{
                _id:idUser,          
                correo : InputCorreo,
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

  function contrasenaAdmin(idUser,InputCorreo){
      let respuesta = [];
      let peticion = $.ajax({
          url : 'http://localhost:4000/api/contrasenaCliente',
          type : 'post',
          contentType : 'application/x-www-form-urlencoded; charset=utf-8',
          dataType : 'json',
          async : false,
          data:{
                _id:idUser,          
                correo : InputCorreo,
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

  function registrarCliente(cliente){
      let respuesta = '';
      let informacion = {
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