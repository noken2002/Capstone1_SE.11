const userRoutes = require('./users');
const ticketRoutes = require('./ticket');
const coahesRoutes = require('./coaches');
const customerRoutes = require('./customer');

function route(app) {
    app.get('/', (req, res) => {
        res.send('user API!');
    });
    app.use('/users', userRoutes);
    app.use('/ticket', ticketRoutes);
    app.use('/coaches', coahesRoutes);
    app.use('/customers', customerRoutes);
    
}

module.exports = route