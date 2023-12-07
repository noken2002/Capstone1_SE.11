const db = require('../../config/db').MSSQLpool;

class PartnerController {


    // lấy thông tin chính của đối tác
    async getPartner(id){
        const sql = `EXEC getPartner '${id}'`;
        try {

            const result = await db.query(sql);
            console.log("Result: ", result)
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

    // lấy ra các chuyến đi đang bán
    async getAllTicketOfPartner(id){
        const sql = `EXEC getAllTicketOfPartner '${id}'`;
        try {

            const result = await db.query(sql);
            console.log("Result: ", result)
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
    // lấy ra các xe của đối tác
    async getAllCoachOfPartner(id){
        const sql = `EXEC getAllCoachOfPartner '${id}'`;
        try {

            const result = await db.query(sql);
            console.log("Result: ", result)
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


    // lấy ra thông tin các tài xế của đối tác
    async getAllDriverOfPartner(id){
        const sql = `EXEC getAllDriverOfPartner '${id}'`;
        try {

            const result = await db.query(sql);
            console.log("Result: ", result)
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

    // lấy danh sách thu tiền của các chuyến đi
    async getAllRevenueOfPartner(id){
        const sql = `EXEC getAllRevenueOfPartner '${id}'`;
        try {

            const result = await db.query(sql);
            console.log("Result: ", result)
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

    //
    async sumRevenueAndPassengerEveryMonthOfPartner(id){
        const sql = `EXEC sumRevenueAndPassengerEveryMonthOfPartner '${id}'`;
        try {

            const result = await db.query(sql);
            console.log("Result: ", result)
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


    //



    //

}

module.exports = new PartnerController;