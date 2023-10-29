const userRoutes = require('./users');
const ticketRoutes = require('./ticket');

function route(app) {
    app.get('/', (req, res) => {
        res.send('user API!');
    });
    app.use('/users', userRoutes);
    app.use('/ticket', ticketRoutes);
    
}

module.exports = route