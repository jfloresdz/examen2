'use strict'

const clienteModel = require('./clientes.model');
const nodeMailer = require('nodemailer');

//Poner en si https://myaccount.google.com/lesssecureapps
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hotelesexamen2@gmail.com',
        pass: 'Contrasenna123'
    }
});


module.exports.registrar = function(req,res){
    let nuevoCliente = new clienteModel({
        primerNombre:req.body.primerNombre,
        segundoNombre:req.body.segundoNombre,
        primerApellido:req.body.primerApellido,
        segundoApellido:req.body.segundoApellido,
        cedula:req.body.cedula,
        correo:req.body.correo,
        contrasena:req.body.contrasena,
        foto:req.body.foto,
        fechaNaciemiento:req.body.fechaNaciemiento,
        sexo:req.body.sexo,
        activado:"0"
    });
    nuevoCliente.save(function(error){
        if(error){
            res.json({success : false, msj : 'No se pudo registrar el cliente, ocurrió el siguiente error' + error});
        }else{

            let mailOptions = {
                from: 'hotelesexamen2@gmail.com',
                to: nuevoCliente.correo,
                subject: 'Bievenido al sistema de hoteles',
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
                             <img width="50px" height="50px" src="https://image.flaticon.com/icons/png/512/235/235889.png">
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
                       <td bgcolor="#fcfcfc" colspan="3" align="center">
                         <img src="${nuevoCliente.foto}" width="125px" height="125px" style="border-radius: 50%;">
                       </td>
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
                               <h1 style="font-family: Arial, Helvetica, sans-serif; font-size: 32px; color: #404040; margin-top: 0; margin-bottom: 20px; padding: 0; line-height: 135%" class="headline">Bienvenido ${nuevoCliente.primerNombre}</h1>
                               <p style="font-family: Arial, Helvetica, sans-serif; color: #555555; font-size: 14px; padding: 0 40px;">
                               Has sido registrado en el sistema de hoteles:
                               </p>
                               <p>
                               correo: <b>${nuevoCliente.correo}</b> / contrasena: <b>${nuevoCliente.contrasena}</b>
                               </p>
                             </td>
                             <td width="30" class="spacer">&nbsp;</td>
                           </tr>
                         </table>
                       </td>
                     </tr>
                     <tr>
                       <td colspan="3" align="center">
                         <br>
                         <img src="https://i.blogs.es/f7b044/costa-rica/450_1000.jpg" width="50%" height="150px">
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

            res.json({success : true, msj : 'El cliente se registró con éxito'});
        }
    });
};

module.exports.listar = function(req,res){
    clienteModel.find().then(
        function(clientes){
            res.send(clientes);
        }
    );
};

module.exports.filtrar = function(req, res){
    switch(req.body.tipo)
    {
        case "1":
        clienteModel.find(
            {
                "primerNombre":   {  
                                $regex: new RegExp(req.body.valor, "ig")
                            } 
            }
            ).then(
                function(clientes){
                    res.send(clientes);
                });
        break;

        case "2":
        clienteModel.find(
            {
                "cedula":   {  
                                $regex: new RegExp(req.body.valor, "ig")
                            } 
            }
            ).then(
                function(clientes){
                    res.send(clientes);
                });
        break;

        case "3":
        clienteModel.find(
            {
                "_id": req.body.valor
            }
            ).then(
                function(clientes){
                    res.send(clientes);
                });
        break;
    }
};

module.exports.actualizar = function (req, res) {
    clienteModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msj: 'No se ha actualizado: ' + handleError(err) });

            } else {
                res.json({ success: true, msj: 'Se ha actualizado correctamente.' });
            }
        });
};