const userRoutes = require('./users');
const ticketRoutes = require('./ticket');
const coahesRoutes = require('./coaches');
const customerRoutes = require('./customer');
const paymentRoutes = require('./payments');
const driverActivityRoutes = require('./driverActivities');
const notificationRoutes = require('./notifications');

function route(app) {
  app.get('/', (req, res) => {
    res.send('user API!');
  });
  app.use('/users', userRoutes);
  app.use('/ticket', ticketRoutes);
  app.use('/coaches', coahesRoutes);
  app.use('/customers', customerRoutes);
  app.use('/payment', paymentRoutes);
  app.use('/driver', driverActivityRoutes);
  app.use('/notification', notificationRoutes);
}

module.exports = route;
