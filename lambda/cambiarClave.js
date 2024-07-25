
//Creación del modulo de Mysql
const mysql = require('mysql');

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    const clave_actual = body.clave_actual;
    const clave_nueva = body.clave_nueva;
    const cuenta = body.cuenta;
    var cta= '';
    
    //Creación de la conexión con la base de datos (Servidor XAMPP, Cliente HeidiSQL, Tunel NGROK)
    const connection = mysql.createConnection({
        host: "0.tcp.sa.ngrok.io",
        port: "16553",
        user: "root",
        password: "",
        database: "cuentabancaria"
      });
    

    const promise = new Promise( (resolve, reject) => {
        //Leer la clave actual
        connection.query("SELECT claveTarjeta FROM cuentabancaria WHERE numeroCuenta =?", cuenta , (err,rows) => {
        if(!err) {
            //Comprobar la clave actual
            var cta = rows[0].claveTarjeta;
            console.log(cta);
            if( cta == clave_actual){ 
                //Actualizar la clave nueva
                connection.query("UPDATE cuentabancaria SET claveTarjeta = ? WHERE numeroCuenta = ?", [clave_nueva, cuenta] , (err,rows) => {
                if(!err) {
                    const mensaje = {
                        statusCode: 400,
                        body: JSON.stringify({Mensaje: "Cambio de clave exitoso"})
                    };
                    resolve(mensaje);
                    connection.end();
                } else {
                    const mensaje2 = {
                        statusCode: 400,
                        body: JSON.stringify({Mensaje: "Error al conectarse a la BD" })
                    }; 
                    resolve(mensaje2);
                    reject(err);
                }      
                });
            }else{
                //La clave actual no es la que consta en la base de datos
                const mensaje3 = {
                    statusCode: 400,
                    body: JSON.stringify({Mensaje: "Clave actual erronea" })
                }; 
                resolve(mensaje3);
            }
            
        } else {
            const mensaje4 = {
                        statusCode: 400,
                        body: JSON.stringify({Mensaje: "Error al conectarse a la BD" })
                    }; 
            resolve(mensaje4);
            reject(err);
        }      
        });
        
    });
    return promise;
}