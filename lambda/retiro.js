//Creación del modulo de Mysql
const mysql = require('mysql');

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    const monto = body.monto;
    const cuenta = body.cuenta;
    var saldo_cuenta= 0;
    var saldo_final = 0;
    
    //Creación de la conexión con la base de datos (Servidor XAMPP, Cliente HeidiSQL, Tunel NGROK)
    const connection = mysql.createConnection({
        host: "0.tcp.sa.ngrok.io",
        port: "16553",
        user: "root",
        password: "",
        database: "cuentabancaria"
      });
    

    const promise = new Promise( (resolve, reject) => {
        //Leer el saldo que hay en la cuenta
        connection.query("SELECT saldo FROM cuentabancaria WHERE numeroCuenta =?", cuenta , (err,rows) => {
        if(!err) {
            //Restar el valor actual menos el valor que se está depositando
            var saldo_cuenta = parseInt(rows[0].saldo);
            console.log(saldo_cuenta);
            if(saldo_cuenta >= monto){
                var saldo_final = saldo_cuenta - monto;
                //Actualizar el saldo en la cuenta
                connection.query("UPDATE cuentabancaria SET saldo = ? WHERE numeroCuenta = ?", [saldo_final, cuenta] , (err,rows) => {
                if(!err) {
                    const mensaje = {
                        statusCode: 400,
                        body: JSON.stringify({Mensaje: "Retiro Exitoso", "Saldo en la cuenta" : saldo_final + " dolares"})
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
                const mensaje3 = {
                    statusCode: 400,
                    body: JSON.stringify({Mensaje: "Saldo Insuficiente" })
                }; 
                resolve(mensaje3);
            }
            
        } else {
            reject(err);
        }      
        });
        
    });
    return promise;
}