
const express = require('express'); 
const morgan = require('morgan');
const cloudinary = require('cloudinary').v2;
var cors = require('cors')
const multer = require('multer')
const upload = multer({dest: 'upload/'});
var bodyParser = require('body-parser');
const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(morgan('combined'));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Cho phép tất cả các origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

const dotenv = require('dotenv');
dotenv.config();  


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const port = process.env.PORT || 3000

const route = require('./routes/')
  
// app.get('/hello', (req, res)=>{ 
//     res.set('Content-Type', 'text/html'); 
//     res.status(200).send({
//         "message": "hello wỏld"
//     }); 
// }); 

route(app);
  
app.listen(port, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ port) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 