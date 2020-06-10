'use strict';

module.exports = (app) => {
    var bookingController = require('../controllers/Booking.Controller.js');
    app.post('/booking', (req,res) => bookingController.createBooking(req, res));
    app.post('/booking/abc', (req, res) => bookingController.getTurnos(req, res));
    app.put('/booking/confirmBooking', (req, res) => bookingController.confirmBooking(req, res));
    app.put('/booking/cancelBooking', (req, res) => bookingController.cancelBooking(req, res));
    app.delete('/booking', (req, res) => bookingController.cancelBookingByMedicCentre(req, res));
    app.get('/test/booking', (req,res) => bookingController.getAll(req,res));
}