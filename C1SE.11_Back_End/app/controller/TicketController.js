// const db = require('../../config/db').MSSQLpool;
// const db = require('odbc')
const db = require('../../config/db').MSSQLpool;
var QRCode = require('qrcode')

class TicketController {

    async generateQRCode(req, res) {
        try {
            let content = req.params.id;
            let qrContent = '127.0.0.1:5500/ticket?id=' + content;
            QRCode.toDataURL(qrContent, function (err, url) {
                res.send({
                    status: 200,
                    data: url
                })
              })

        }
        catch (err) {
            console.log(err);
        }
    }

    async getTicket(req, res){
        let ticketId = req.params.id;
        if (ticketId) {
            const sql = `EXEC GetTicketInformation '` + ticketId +`'`;
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
        }else{
            res.send({
                status: 500,
                data: "Ticket Not Found"
            });
        }
    }

}

module.exports = new TicketController;