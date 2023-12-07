const db = require('../../config/db').MSSQLpool;

class LoginControler {

    //Đăng nhập
    async loginForAll(req, res){


        let {
            username,
            password
        } = req.body;


        const sql = `EXEC getAccount '${username}', '${password}'`;
        db.query(sql, (err, result) => {//-->>result lấy ra id và role
        if (err) {
          res.send({
            status: 500,
            data: err,
          });
        } else {
            res.send({
                status: 200,
                data : result,
            })
        }
      });
    }
}


module.exports = new LoginControler;