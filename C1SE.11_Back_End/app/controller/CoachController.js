const db = require('../../config/db').MSSQLpool;
// const db = require('odbc')
class CoachController {
  async getAllCoaches() {
    const sql = `SELECT * FROM Coaches`;
    try {
      const result = await db.query(sql);
      console.log('Resultttt', result);
      return {
        status: 200,
        data: result.recordset,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        err: err,
      };
    }
  }

  async getCoachById(coach_id) {
    console.log('coach_id', coach_id);
    const sql = `
        SELECT * FROM Coaches
        WHERE coach_id = '${coach_id}';
        `;

    console.log('sql', sql);
    try {
      const result = await db.query(sql);
      console.log('Resultttt', result);
      return {
        status: 200,
        data: result.recordset,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        err: err,
      };
    }
  }

  async getCoachSeatById(coach_id, query) {
    let sql = `
        SELECT *, 
        SUBSTRING(seat_number, 1, 1) AS seat_letter,
        CAST(SUBSTRING(seat_number, 2, LEN(seat_number) - 1) AS INT) AS seat_number_numeric
        FROM Seats
        WHERE coach_id = '${coach_id}'`;

    if (query.decker) {
      sql += ` and decker = '${query.decker}'`;
    }
    sql += ` order by seat_number_numeric, seat_letter;`;

    const sql2 = `select *from Tickets where coach_id = '${coach_id}'`;

    try {
      const [seatsResult, ticketsResult] = await Promise.all([
        db.query(sql),
        db.query(sql2),
      ]);
      const tickets = ticketsResult.recordset;
      const data = seatsResult.recordset.map((el) => {
        el.ticket = null;
        const ticket = tickets.find(
          (t) => t.coach_id === el.coach_id && t.seat_number === el.seat_number
        );
        if (ticket) {
          el.ticket = ticket;
        }
        return el;
      });
      return {
        status: 200,
        data,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        err: err,
      };
    }
  }
  async setSeatStatus(data) {
    const { coach_id, seat_number, seat_status } = data;
    let sql = `update Seats set seat_status = ${seat_status} where coach_id = '${coach_id}' and seat_number='${seat_number}'`;
    try {
      const result = await db.query(sql);
      //giả lập hành khách xuống CHUẨN BỊ xuống xe sau 40s và XUỐNG xe sau 55s
      if (seat_status === 3) {
        this.mockChangeSeatStatus(db, { coach_id, seat_number });
      }
      return {
        status: 200,
        message: 'Cập nhật trạng thái ghế thành công',
        data: result.recordset,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: err.message,
        err: err,
      };
    }
  }
  mockChangeSeatStatus(db, { coach_id, seat_number }) {
    /**giả lập hành khách chuẩn bị xuống xe sau 40s(từ lúc lên xe) */
    setTimeout(async () => {
      let sql = `update Seats set seat_status = 4 where coach_id = '${coach_id}' and seat_number='${seat_number}'`;
      let sqlNoti = `insert into Notifications(notification_type, notification_content) values('1', N'Hành khách số ghế ${seat_number} chuẩn bị xuống xe')`;
      await Promise.all([db.query(sql), db.query(sqlNoti)]);
    }, 40000);

    /**giả lập hành khách chuẩn bị xuống xe sau 55s(từ lúc lên xe) */
    setTimeout(async () => {
      let sql = `update Seats set seat_status = 1 where coach_id = '${coach_id}' and seat_number='${seat_number}'`;
      await db.query(sql);
    }, 55000);
  }
  async getTiketsInCoach(coach_id) {
    console.log('coach_id', coach_id);
    const sql = `
        SELECT Tickets.* FROM Tickets
        WHERE Tickets.coach_id = C.coach_id AND Tickets.coach_id = '${coach_id}';
        `;

    console.log('sql', sql);
    try {
      const result = await db.query(sql);
      console.log('Resultttt', result);
      return {
        status: 200,
        data: result.recordset,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        err: err,
      };
    }
  }

  async getCoachAndTiketById(coach_id) {
    console.log('coach_id', coach_id);
    const sql = `
        SELECT Tickets.*, C.coach_id,P.*,Pa.ticket_id FROM Tickets ,Coaches AS C, Partners AS P,Payments as Pa
        WHERE Tickets.coach_id = C.coach_id 
        AND Tickets.partner_id = P.partner_id 
        AND Tickets.ticket_id = Pa.ticket_id 
        AND Tickets.coach_id = '${coach_id}';
        `;

    console.log('sql', sql);
    try {
      const result = await db.query(sql);
      console.log('Resultttt', result);
      return {
        status: 200,
        data: result.recordset,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        err: err,
      };
    }
  }

    async getCoachAndTiketById2( trip_id) {
        const sql =  `
            select Tickets.*
		    from Tickets
		    WHERE Tickets.trip_id = '${trip_id}'
        `;

    console.log('sql', sql);
    try {
      const result = await db.query(sql);
      console.log('Resultttt', result);
      return {
        status: 200,
        data: result.recordset,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        err: err,
      };
    }
  }
}

module.exports = new CoachController();
