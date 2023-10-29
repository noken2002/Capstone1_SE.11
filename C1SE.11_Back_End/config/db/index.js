const mssql = require('mssql/msnodesqlv8');
// const db = require('odbc')()
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const MSSQLpool = new mssql.ConnectionPool({
    server: "QUOCANH-PC\\SQLEXPRESS01",
    database: "expressTickets",
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
});

// const MSSQLpool = new mssql.ConnectionPool('Driver={ODBC Driver 17 for SQL Server};Server=QUOCANH-PC\SQLEXPRESS;Database=expressTickets;Trusted_Connection=yes;');

MSSQLpool.connect().then(() => {
    console.log('Connected to mssql database');
}).catch((err) => {
    console.log('MSSQL Database Connection Failed! Bad Config: ', err);
});

module.exports = { MSSQLpool };