const { formatResponse } = require('../../utils/formatResponse');

const db = require('../../config/db').MSSQLpool;

async function getCustomer(req, res) {
  const { limit = 10, page = 1 } = req.query;

  let sql = `select t1.*, t2.seat_status from Tickets t1 left join Seats t2 on t1.seat_number = t2.seat_number and t1.coach_id = t2.coach_id
  order by t1.ticket_id offset ${
    limit * (page - 1)
  } rows fetch next ${limit} rows only`;
  let countSql = `select count(ticket_id) as total from Tickets`;
  try {
    const [dataResult, countResult] = await Promise.all([
      db.query(sql),
      db.query(countSql),
    ]);
    const tickets = dataResult.recordset;
    const [{ total }] = countResult.recordset;

    let customeres = [];
    let trips = [];
    if (tickets.length > 0) {
      const customerIds = tickets.map((el) => `'${el.customer_id_}'`).join(',');
      const tripIds = tickets.map((el) => `'${el.trip_id}'`).join(',');
      let customerSql = `select *from Customers where customer_id in(${customerIds})`;
      let tripSql = `select *from Trips where trip_id in(${tripIds})`;
      const [customerResult, tripResult] = await Promise.all([
        await db.query(customerSql),
        await db.query(tripSql),
      ]);
      customeres = customerResult.recordset;
      trips = tripResult.recordset;
    }
    tickets.forEach((t) => {
      t.customer = null;
      t.trip = null;
      const customer = customeres.find((c) => c.customer_id === t.customer_id_);
      const trip = trips.find((tp) => tp.trip_id === t.trip_id);
      if (customer) {
        t.customer = customer;
      }
      if (trip) {
        t.trip = trip;
      }
    });

    const response = formatResponse([tickets, total], page, limit);
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
async function getCustomerBoarded(req, res) {
  const { limit = 10, page = 1 } = req.query;

  let sql = `select t1.*, t2.seat_status from Tickets t1 left join Seats t2 on t1.seat_number = t2.seat_number and t1.coach_id = t2.coach_id
    where t2.seat_status = 3 -- ghế đã có người ngồi nghĩa là hành khách đã lên xe
    order by t1.ticket_id offset ${
      limit * (page - 1)
    } rows fetch next ${limit} rows only`;
  let countSql = `select count(t1.ticket_id) from Tickets t1 left join Seats t2 on t1.seat_number = t2.seat_number and t1.coach_id = t2.coach_id
    where t2.seat_status = 3`;
  try {
    const [dataResult, countResult] = await Promise.all([
      db.query(sql),
      db.query(countSql),
    ]);
    const tickets = dataResult.recordset;
    const [{ total }] = countResult.recordset;

    let customeres = [];
    let trips = [];
    if (tickets.length > 0) {
      const customerIds = tickets.map((el) => `'${el.customer_id_}'`).join(',');
      const tripIds = tickets.map((el) => `'${el.trip_id}'`).join(',');
      let customerSql = `select *from Customers where customer_id in(${customerIds})`;
      let tripSql = `select *from Trips where trip_id in(${tripIds})`;
      const [customerResult, tripResult] = await Promise.all([
        await db.query(customerSql),
        await db.query(tripSql),
      ]);
      customeres = customerResult.recordset;
      trips = tripResult.recordset;
    }
    tickets.forEach((t) => {
      t.customer = null;
      t.trip = null;
      const customer = customeres.find((c) => c.customer_id === t.customer_id_);
      const trip = trips.find((tp) => tp.trip_id === t.trip_id);
      if (customer) {
        t.customer = customer;
      }
      if (trip) {
        t.trip = trip;
      }
    });

    const response = formatResponse([tickets, total], page, limit);
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
module.exports = { getCustomerBoarded, getCustomer };
