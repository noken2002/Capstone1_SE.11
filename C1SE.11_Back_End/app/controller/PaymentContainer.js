const db = require('../../config/db').MSSQLpool;
const { v4: uuidv4 } = require('uuid');
var QRCode = require('qrcode')
// const db = require('odbc')
class PaymentController {

    async storePayment(req, res) {

        
        let {
            ticket_id,
            customer_id,
            origin,
            destination,
            departure_datetime,
            booking_date,
            payment_date,
            amount,
            payment_method
        } = req.body;

        console.log(ticket_id)
        
        let qrContent = 'http://127.0.0.1:5500/C1SE.11_Front_End/Assets/Driver_FE/showTicket.html?id=';

        let query = `INSERT INTO Payments (payment_id, ticket_id, customer_id, qr_code_image, origin, destination, departure_datetime, booking_date, payment_date, amount, payment_method)
        VALUES`
            
        let qr_arr = []

        const createQRCode = (content) => {
            return new Promise((resolve, reject) => {
                QRCode.toDataURL(content, (err, url) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(url);
                    }
                });
            });
        };

        for (const ticket_id_ of ticket_id) {
            let content = qrContent + ticket_id_
            let qr_image = ''
            let payment_id = uuidv4();
            try {
                qr_image = await createQRCode(content);
                qr_arr.push(qr_image);
    
                // Tiếp tục xử lý câu truy vấn ở đây, sau khi qr_image đã có giá trị
            } catch (error) {
                console.error(error);
            }

           query += `('${payment_id}', 
           '${ticket_id_}', 
           '${customer_id}', 
           '${qr_image}', 
           '${origin}', 
           '${destination}', 
           '${departure_datetime}', 
           '${booking_date}', 
           '${payment_date}', 
           ${amount}, 
           '${payment_method}'),`
        }

        query = query.slice(0, -1)
        console.log(query)

        db.query(query, (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    data: err
                });
            } else {
                res.send({
                    status: 200,
                    data: qr_arr
                });
            };
        });

    

    }
}

module.exports = new PaymentController;