const mssql = require('mssql/msnodesqlv8');
// const db = require('odbc')()
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const MSSQLpool = new mssql.ConnectionPool({
  server: process.env.MSSQL_SERVER_NAME,
  database: process.env.MSSQL_DATABASE_NAME,
  user: process.env.MSSQL_DATABASE_USERNAME,
  password: process.env.MSSQL_DATABASE_PASSWORD,
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: false,
  },
});

// const MSSQLpool = new mssql.ConnectionPool('Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-QORQO49\SQLEXPRESS;Database=expressTickets;Trusted_Connection=yes;');

// const MSSQLpool = new mssql.ConnectionPool({
//     connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-QORQO49\\SQLEXPRESS;Database=expressTickets;Trusted_Connection=yes;',
// });

MSSQLpool.connect()
  .then(() => {
    console.log('Connected to mssql database');
  })
  .catch((err) => {
    console.log('MSSQL Database Connection Failed! Bad Config: ', err);
  });

module.exports = { MSSQLpool };
