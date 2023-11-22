// const db = require('../../config/db').MSSQLpool;
// const db = require('odbc')
const { v4: uuidv4 } = require('uuid');
const db = require('../../config/db').MSSQLpool;
const QRCode = require('qrcode');
const { formatResponse } = require('../../utils/formatResponse');

class TicketController {
  async generateQRCode(req, res) {
    try {
      let content = req.params.id;
      let qrContent =
        'http://127.0.0.1:5500/C1SE.11_Front_End/Assets/Driver_FE/showTicket.html?id=' +
        content;
      QRCode.toDataURL(qrContent, function (err, url) {
        res.send({
          status: 200,
          data: url,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getTickets(req, res) {
    const { limit = 10, page = 1 } = req.query;

    let sql = `select *from Tickets order by ticket_id offset ${
      limit * (page - 1)
    } rows fetch next ${limit} rows only`;
    let countSql = `select count(ticket_id) as total from Tickets`;

    try {
      const [dataResult, countResult] = await Promise.all([
        db.query(sql),
        db.query(countSql),
      ]);
      const [{ total }] = countResult.recordset;
      const response = formatResponse(
        [dataResult.recordset, total],
        page,
        limit
      );
      res.send({
        status: 200,
        ...response,
      });
    } catch (e) {
      res.send({
        status: 500,
        message: e.message,
        err: e,
      });
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
            data: err,
          });
        } else {
          res.send({
            status: 200,
            data: result,
          });
        }
      });
    } else {
      res.send({
        status: 500,
        data: 'Ticket Not Found',
      });
    }
  }


    async storeTicket(req, res) {
        // ticket_id
        // partner_id
        // trip_id
        // customer_id_
        // coach_id
        // departure_date
        // arrival_datetime
        // seat_number
        // price
        // status_

        let {
            trip_id,
            customer_id,
            departure_date,
            arrival_datetime,
            seat_number,
            price } = req.body;


    const query = `INSERT INTO Tickets (
            ticket_id, 
            trip_id, 
            customer_id_, 
            departure_date, 
            seat_number, 
            price, 
            status_) values(
                '${ticket_id}', 
                '${trip_id}', 
                '${customer_id}', 
                '${departure_date}', 
                '${seat_number}', 
                ${price}, 
                ${status}
            )`;

    const updateSeatQuery = `update Seats set seat_status = 2 where coach_id = '${coach_id}' and seat_number='${seat_number}'`;
    try {
      const [ticketsResult] = await Promise.all([
        db.query(query),
        db.query(updateSeatQuery),
      ]);
      res.send({
        status: 200,
        data: ticketsResult.recordset,
      });
    } catch (e) {
      console.log(err);
      return {
        status: 500,
        err: err,
      };
    }
  }


    async generateTicket(req, res) {
        let {
            trip_id,
            customer_id,
            departure_date,
            seat,
            price
        } = req.body;

        let results = [];

        let query = `INSERT INTO Tickets (
            ticket_id, 
            trip_id, 
            customer_id_, 
            departure_datetime, 
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
                    '${trip_id}', 
                    '${customer_id}', 
                    '${departure_date}', 
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

    async generateAllTicket(req, res) {
        let {
            trip_id,
            partner_id,
            customer_id,
            coach_id,
            departure_date,
            arrival_datetime,
            seat,
            price
        } = req.body;


    let results = [];

    let query = `INSERT INTO Tickets (
            ticket_id, 
            trip_id, 
            customer_id, 
            departure_date, 
            arrival_datetime, 
            seat_number, 
            price, 
            status_) values`;

    let ticket_id_arr = [];

    for (const seat_number of seat) {
      let status = 0;
      let ticket_id = uuidv4();

      ticket_id_arr.push(ticket_id);
      query += `(
                    '${ticket_id}', 
                    '${trip_id}', 
                    '${customer_id}', 
                    '${departure_date}', 
                    '${arrival_datetime}', 
                    '${seat_number}', 
                    ${price}, 
                    ${status}
                ),`;
    }

    query = query.slice(0, -1);
    console.log(query);

    db.query(query, (err, result) => {
      if (err) {
        res.send({
          status: 500,
          data: err,
        });
      } else {
        res.send({
          status: 200,
          data: ticket_id_arr,
        });
      }
    });
  }
}

module.exports = new TicketController();

