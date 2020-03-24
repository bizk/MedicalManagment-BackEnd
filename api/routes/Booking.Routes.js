'use strict';

module.exports = (app) => {
    var bookingController = require('../controllers/Booking.Controller.js');
    app.post('/booking/createBooking', (req,res) => bookingController.createBooking(req, res));
    app.put('/booking/confirmBooking', (req, res) => bookingController.confirmBooking(req, res));
    app.put('/booking/cancelBooking', (req, res) => bookingController.cancelBooking(req, res));
    app.put('/booking/cancelBookingByMedicCentre', (req, res) => bookingController.cancelBookingByMedicCentre(req, res));
    app.get('/booking/getAll', (req,res) => bookingController.getAll(req,res));
}