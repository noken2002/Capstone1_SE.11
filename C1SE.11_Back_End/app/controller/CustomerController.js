const db = require('../../config/db').MSSQLpool;

class CustomerController {
    async getAllCustormers() {
        const sql = `SELECT * FROM Customers`;
        try {

            const result = await db.query(sql);
            console.log("Resultttt", result)
            return {
                status: 200,
                data: result.recordset
            }
        }
        catch (err) {
            console.log(err);
            return {
                status: 500,
                err: err
            }
        }

    }
}

module.exports = new CustomerController;