'use strict';

module.exports = (app) => {
    var bookingController = require('../controllers/Booking.Controller.js');
    app.post('/booking', (req,res) => bookingController.createBooking(req, res));
    app.put('/booking/confirmBooking', (req, res) => bookingController.confirmBooking(req, res));
    app.put('/booking/cancelBooking', (req, res) => bookingController.cancelBooking(req, res));
    app.delete('/booking', (req, res) => bookingController.cancelBookingByMedicCentre(req, res));
    
    app.post('/booking/abc', (req, res) => bookingController.getTurnos(req, res));
    app.post('/booking/getDays', (req, res) => bookingController.getTurnos_specialityDay_days(req, res));
    app.post('/booking/getMedics', (req, res) => bookingController.getTurnos_specialityDay_medics(req, res));
    app.post('/booking/getHours', (req, res) => bookingController.getTurnos_specialityDay_hours(req, res));

    app.post('/booking/medic/getTodayBookingHours', (req, res) => bookingController.getTodayBookings(req, res));
    app.post('/booking/medic/getWeekBookingHours', (req, res) => bookingController.getWeekBookings(req, res));
    app.post('/booking/medic/getAllBookingHours', (req, res) => bookingController.getAllBookings(req, res));

    app.get('/test/booking', (req,res) => bookingController.getAll(req,res));

    app.post("/booking/patient", (req, res) => bookingController.getById_patient(req, res));
    app.post("/booking/medic", (req, res) => bookingController.getById_medic(req, res));
}