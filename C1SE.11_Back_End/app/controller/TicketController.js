// const db = require('../../config/db').MSSQLpool;
// const db = require('odbc')
var QRCode = require('qrcode')

class TicketController {

    async generateQRCode(req, res) {
        try {

            QRCode.toDataURL('I am a pony!', function (err, url) {
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

}

module.exports = new TicketController;