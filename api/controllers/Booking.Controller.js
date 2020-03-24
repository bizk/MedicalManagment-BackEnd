const { Booking, People } = require('../models');

module.exports = {
    createBooking(req, res) {
        var patient = People.findOne({
            where: {
                peopleUUID: req.body.peopleUUID
            }
        });
        var medic = People.findOne({
            where: {
                peopleUUID: req.body.peopleUUID
            }
        })
        Booking.create({
            day: req.body.day,
            time_start: req.body.time_start,
            time_end: req.body.time_end,
            status: req.body.status,
        }, {
            include: [
                {
                    model: patient,
                    as: 'patient'
                }, {
                    include: medic,
                    as: 'medic'
                }
            ]
        })
    },
    getAll(req, res) {
        Booking.findAll({}).then(data=>res.status(200).send(data)).catch(e=>console.log(e));
    },
    confirmBooking(req, res) {
        Booking.update({
            where:{ id: req.body.bookingId }
        }, {status: "confirmed"})
        .then(data => data.status(200).send(data))
        .catch(e => console.log(e));
    },
    cancelBooking(req, res) {
        Booking.update({
            where:{ id: req.body.bookingId }
        }, {status: "cancelled"})
        .then(data => data.status(200).send(data))
        .catch(e => console.log(e));
    }
}