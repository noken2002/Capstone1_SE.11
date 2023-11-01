
const express = require('express'); 
const morgan = require('morgan');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
app.use(express.text());
app.use(morgan('combined'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Cho phép tất cả các origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

const dotenv = require('dotenv');
dotenv.config();  

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