const db = require('../../config/db').MSSQLpool;
// const db = require('odbc')
class UserController {

    async getAllUser(req, res) {
        const sql = 'SELECT * FROM Users';
        try {
            // let pool = db.pool("server=QUOCANH-PC\SQLEXPRESS01;Database=expressTickets;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}", (error1, pool) => {
            //     if (error1) {
            //         console.log("Error 1" + error1); 
            //         return; 
            //     } // handle
            //     pool.connect((error2, connection) => {
            //         if (error2) { 
            //             console.log("Error 2" + error2);
            //             return; } // handle
            //         // now have a Connection to do work with
            //         console.log("connect success")
            //         res.send({
            //             status: 200,
            //             messsage: "Success"
            //         })
            //     });
            // });
            
                db.query(sql, (err, result) => {
                    if (err) {
                        res.send({
                            status: 500,
                            data: err
                        });
                    } else {
                        res.send({
                            status: 200,
                            data: result
                        });
                    };
                }
                );



            // res.send({
            //                 status: 200,
            //                 data: "kak"
            //             });
        }
        catch (err) {
            console.log(err);
        }
    }

}

module.exports = new UserController;