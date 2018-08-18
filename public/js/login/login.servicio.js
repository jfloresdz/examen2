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

  function contrasenaEstudiante(idUser,InputCorreo){
      let respuesta = [];
      let peticion = $.ajax({
          url : 'http://localhost:4000/api/contrasenaEstudiante',
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

  function contrasenaProfesor(idUser,InputCorreo){
      let respuesta = [];
      let peticion = $.ajax({
          url : 'http://localhost:4000/api/contrasenaProfesor',
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