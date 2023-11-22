const db = require('../../config/db').MSSQLpool;
// const db = require('odbc')
class CoachController {

    async getAllCoaches() {
        const sql = `SELECT * FROM Coaches`;
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
    


    async getCoachById(coach_id) {
        console.log("coach_id", coach_id)
        const sql =  `
        SELECT * FROM Coaches
        WHERE coach_id = '${coach_id}';
        `;
    
        console.log("sql",sql)
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

    async getTiketsInCoach(coach_id) {
        console.log("coach_id", coach_id)
        const sql =  `
        SELECT Tickets.* FROM Tickets
        WHERE Tickets.coach_id = C.coach_id AND Tickets.coach_id = '${coach_id}';
        `;
    
        console.log("sql",sql)
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

    async getCoachAndTiketById(coach_id) {
        console.log("coach_id", coach_id)
        const sql =  `
        SELECT Tickets.*, C.coach_id,P.*,Pa.ticket_id FROM Tickets ,Coaches AS C, Partners AS P,Payments as Pa
        WHERE Tickets.coach_id = C.coach_id 
        AND Tickets.partner_id = P.partner_id 
        AND Tickets.ticket_id = Pa.ticket_id 
        AND Tickets.coach_id = '${coach_id}';
        `;
    
        console.log("sql",sql)
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

    async getCoachAndTiketById2( trip_id) {
        const sql =  `
            select Tickets.*
		    from Tickets
		    WHERE Tickets.trip_id = '${trip_id}'
        `;
    
        console.log("sql",sql)
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

module.exports = new CoachController;