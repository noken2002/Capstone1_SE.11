const { formatResponse } = require('../../utils/formatResponse');

const db = require('../../config/db').MSSQLpool;

async function getNotifications(req, res) {
  const { limit = 10, page = 1 } = req.query;

  let sql = `select *from Notifications order by notification_id offset ${
    limit * (page - 1)
  } rows fetch next ${limit} rows only`;
  let countSql = `select count(notification_id) as total from Notifications`;
  try {
    const [dataResult, countResult] = await Promise.all([
      db.query(sql),
      db.query(countSql),
    ]);
    const notifincations = dataResult.recordset;
    const [{ total }] = countResult.recordset;

    const response = formatResponse([notifincations, total], page, limit);
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

module.exports = { getNotifications };
