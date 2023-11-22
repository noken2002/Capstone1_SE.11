const db = require('../../config/db').MSSQLpool;
// const db = require('odbc')
class TripController {

    async searchTrip(req, res) {
         let {origin,destination, departure_date} = req.query;
         console.log(req.query)

         let year= departure_date.split('-')[0]
         let month= departure_date.split('-')[1]
         let day = departure_date.split('-')[2]

        //  let origin = req.params.origin
        //  let destination = req.params.destination
        //  let departure_date = req.params.departure_date
        const sql = `select 
                Trips.trip_id, 
                Trips.trip_name, 
                Trips.origin, 
                Trips.destination,
                FORMAT(Trips.arrival_datetime, 'yyyy-MM-dd HH\:mm') as arrival_datetime,
                FORMAT(Trips.departure_date, 'yyyy-MM-dd HH\:mm') as departure_date,
                Trips.number_of_ticket,
                Trips.price_trip,
                Coaches.*
            from Trips, Coaches
            WHERE Trips.coach_id = Coaches.coach_id
            and
                (DATEPART(yy, Trips.departure_date) = ${year}
                AND    DATEPART(mm, Trips.departure_date) = ${month}
                AND    DATEPART(dd, Trips.departure_date) = ${day})
                AND Trips.origin  = N'${origin}'
                AND Trips.destination = N'${destination}'`;
        console.log(sql)
        try {
                db.query(sql, (err, result) => {
                    if (err) {
                        res.send({
                            status: 500,
                            data: err
                        });
                    } else {
                        console.log(result.recordset)
                        res.send({
                            status: 200,
                            data: result
                        });
                    };
                }
                );
            


            // res.send({
            //                 status: 200,
            //                 data: "kak"
            //             });
        }
        catch (err) {
            console.log(err);
        }
    }

}

module.exports = new TripController;