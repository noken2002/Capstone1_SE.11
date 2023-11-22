const userRoutes = require('./users');
const ticketRoutes = require('./ticket');
const coahesRoutes = require('./coaches');
const customerRoutes = require('./customer');
const paymentRoutes = require('./payments');
const tripRoutes = require('./trips');


function route(app) {
    app.get('/', (req, res) => {
        res.send('API!');
    });
    app.use('/users', userRoutes);
    app.use('/ticket', ticketRoutes);
    app.use('/coaches', coahesRoutes);
    app.use('/customers', customerRoutes);
    app.use('/payment', paymentRoutes);
    app.use('/trip', tripRoutes);
    
}

module.exports = route