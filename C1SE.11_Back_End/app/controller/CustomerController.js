const db = require('../../config/db').MSSQLpool;
const cloudinary = require('cloudinary').v2;
const fs = require('fs')


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

    async uploadImage(req, res) {
        let file = req.file;
        if (!file) {
            return res.status(400).json({ status: 400, message: 'Hình ảnh không tồn tại.' });
        }
        if (!file.mimetype.startsWith('image/')) {
            return res.status(400).json({ status: 400, message: 'Không phải là hình ảnh.' });
        }
        await cloudinary.uploader.upload(file.path).then(
            results => {
                fs.unlinkSync(file.path)
                res.send({
                    "status": 200,
                    "url": results
                })
            }
        ).catch(err => {
            res.send({
                "status": 500,
                "message": err
            })
        })

    }
}

module.exports = new CustomerController;