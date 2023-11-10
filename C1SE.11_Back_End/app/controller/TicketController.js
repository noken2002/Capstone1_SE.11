// const db = require('../../config/db').MSSQLpool;
// const db = require('odbc')
const { v4: uuidv4 } = require('uuid');
const db = require('../../config/db').MSSQLpool;
var QRCode = require('qrcode')

class TicketController {

    async generateQRCode(req, res) {
        try {
            let content = req.params.id;
            let qrContent = 'http://127.0.0.1:5500/C1SE.11_Front_End/Assets/Driver_FE/showTicket.html?id=' + content;
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

    async getTicket(req, res) {
        let ticketId = req.params.id;
        if (ticketId) {
            const sql = `EXEC GetTicketInformation '` + ticketId + `'`;
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
        } else {
            res.send({
                status: 500,
                data: "Ticket Not Found"
            });
        }
    }

    async storeTicket(req, res) {
        // ticket_id
        // partner_id
        // trip_id
        // customer_id_
        // coach_id
        // departure_datetime
        // arrival_datetime
        // seat_number
        // price
        // status_

        let {
            partner_id,
            trip_id,
            customer_id_,
            coach_id,
            departure_datetime,
            arrival_datetime,
            seat_number,
            price } = req.body;

        console.log(req.body);

        let status = 0;
        let ticket_id = uuidv4();

        const query = `INSERT INTO Tickets (
            ticket_id, 
            partner_id, 
            trip_id, 
            customer_id_, 
            coach_id, 
            departure_datetime, 
            arrival_datetime, 
            seat_number, 
            price, 
            status_) values(
                '${ticket_id}', 
                '${partner_id}', 
                '${trip_id}', 
                '${customer_id_}', 
                '${coach_id}', 
                '${departure_datetime}', 
                '${arrival_datetime}', 
                '${seat_number}', 
                ${price}, 
                ${status}
            )`

        console.log(query);

        db.query(query, (err, result) => {
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
        });
    }

    async generateTicket(req, res) {
        let {
            trip_id,
            partner_id,
            customer_id,
            coach_id,
            departure_datetime,
            arrival_datetime,
            seat,
            price
        } = req.body;

        let results = [];

        let query = `INSERT INTO Tickets (
            ticket_id, 
            partner_id, 
            trip_id, 
            customer_id_, 
            coach_id, 
            departure_datetime, 
            arrival_datetime, 
            seat_number, 
            price, 
            status_) values`;

        let ticket_id_arr = []

        for (const seat_number of seat) {
            let status = 0;
            let ticket_id = uuidv4();

            ticket_id_arr.push(ticket_id)
            query += `(
                    '${ticket_id}', 
                    '${partner_id}', 
                    '${trip_id}', 
                    '${customer_id}', 
                    '${coach_id}', 
                    '${departure_datetime}', 
                    '${arrival_datetime}', 
                    '${seat_number}', 
                    ${price}, 
                    ${status}
                ),`;
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
                    data: ticket_id_arr
                });
            };
        });

    }

}

module.exports = new TicketController;