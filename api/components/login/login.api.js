'use strict';
const clienteModel = require('../clientes/clientes.model');
const adminModel = require('../admin/admin.model');
const nodeMailer = require('nodemailer');

//Poner en si https://myaccount.google.com/lesssecureapps
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hotelesexamen2@gmail.com',
        pass: 'Contrasenna123'
    }
});

module.exports.login = function(req, res){
    adminModel.find({
        "correo": req.body.correo,
        "contrasena": req.body.contrasena
    }).then(
        function (admin) {
            if(admin.length>0){
                res.send({
                    "_id":admin[0]._id,
                    "foto":admin[0].foto,
                    "nombre":admin[0].nombre,
                    "tipo":"0",
                    "estado":"0"
                })
            }else{
                clienteModel.find(
                    {
                        "correo": req.body.correo,
                        "contrasena": req.body.contrasena
                    }
                ).then(
                    function (clientes) {
                        if(clientes.length>0){ 
                            res.send({
                            "_id":clientes[0]._id,
                            "foto":clientes[0].foto,
                            "nombre":clientes[0].primerNombre+" "+clientes[0].primerApellido,
                            "tipo":"1",
                            "estado":clientes[0].activado
                        })
                            }else{
                                res.send([])
                            }
                    });
            }
        }
    )
}


module.exports.comprobarCorreo = function(req, res){
    adminModel.find({
        "correo": req.body.correo
    }).then(
        function (admin) {
            if(admin.length>0){
                res.send({
                    "_id":admin[0]._id,
                    "_result":true,
                    "tipo":"0"
                })
            }else{
                clienteModel.find(
                    {
                        "correo": req.body.correo
                    }
                ).then(
                    function (clientes) {
                        if(clientes.length>0){ 
                            res.send({
                            "_id":clientes[0]._id,
                            "_result":true,
                            "tipo":"1"
                        })
                            }else{
                                res.send({
                                    "_result":false
                                })
                            }
                    }
                )
            }
        }
    )
}


module.exports.contrasenaCliente = function (req, res) {
    let correo =req.body.correo;
    let contrasena = req.body.contrasena;
    clienteModel.findByIdAndUpdate(req.body._id, { $set:req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msj: 'No se ha actualizado: ' + handleError(err) });
            } else {
                enviarMail(correo,contrasena);
                res.json({ success: true, msj: 'Se ha actualizado correctamente.' });
            }
        });
}

module.exports.contrasenaAdmin = function (req, res) {
    let correo =req.body.correo;
    let contrasena = req.body.contrasena;
    adminModel.findByIdAndUpdate(req.body._id, { $set:req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msj: 'No se ha actualizado: ' + handleError(err) });
            } else {
                enviarMail(correo,contrasena);
                res.json({ success: true, msj: 'Se ha actualizado correctamente.' });
            }
        });
}


function enviarMail(correo,contrasena) {
    let mailOptions = {
        from: 'hotelesexamen2@gmail.com',
        to: correo,
        subject: 'Recuperacion de contraseña Sistema de Hoteles',
        html:
         `
         <html>
         <body bgcolor="#2D2D2D" style="font-family: Arial; background-color: #2D2D2D;">
       
           <table width="630" class="container" align="center" cellpadding="0" cellspacing="0">
           <tr>
             <td>
               <table align="left">
                 <tr>
                   <td width="50px" height="50px" class="Logo">
                   <img width="50px" height="50px"src="https://image.flaticon.com/icons/png/512/235/235889.png">
                   </td>
                 </tr>
               </table>
               <table align="right">
                 <tr>
                   <td height="70" class="viewWebsite">
                     <p style="font-family: Arial, Helvetica, sans-serif; color: #ffffff; font-size: 14px;">Sistema de hoteles</p>
                   </td>
                 </tr>
               </table>
             </td>
           </tr>
           </table>
       
           <table width="630" bgcolor="#fcfcfc" style="border: 1px solid #dddddd; line-height: 135%;" class="container" align="center" cellpadding="0" cellspacing="0">
             <tr>
               <td bgcolor="#fcfcfc" colspan="3" width="100%" height="10">&nbsp;</td>
             </tr>
             <tr>
               <td colspan="3" height="15">&nbsp;</td>
             </tr>
             <tr>
               <td bgcolor="#fcfcfc" colspan="3">
                 <table>
                   <tr>
                     <td width="30" class="spacer">&nbsp;</td>
                     <td align="center" class="bodyCopy">
                       <p style="font-family: Arial, Helvetica, sans-serif; color: #555555; font-size: 14px; padding: 0 40px;">
                       Su nueva contraseña es:
                       </p>
                       <p>
                       Contraseña: <b>${contrasena}</b>
                       </p>
                     </td>
                     <td width="30" class="spacer">&nbsp;</td>
                   </tr>
                 </table>
               </td>
             </tr>
             <tr>
               <td colspan="3" height="3">&nbsp;</td>
             </tr>
           </table>
         <br>
         <br>
         </body>
       </html>               
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
