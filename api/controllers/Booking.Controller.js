const { Booking, People, Specialities } = require('../models');

module.exports = {
    createBooking(req, res) {
        var patient = People.findOne({
            where: {
                patientPeopleUUID: req.body.patientUUID
            }
        });
        var medic = People.findOne({
            where: {
                medicPeopleUUID: req.body.medicUUID
            }
        });
        var speciality = Specialities.findOne({
            where: {
                specialityid:  req.body.specialityId
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
                    model: People,
                    as: 'patient'
                }, {
                    include: People,
                    as: 'medic'
                }, {
                    model: speciality,
                    as: 'speciality'
                }
            ]
        })
    },
    getAll(req, res) {
        Booking.findAll({
            include: [
                {
                    model: Specialities,
                    as: 'speciality'
                },
                {
                    model: People,
                    as: 'patient'
                },
                {
                    model: People,
                    as: 'medic'
                }
            ]
        }).then(data=>res.status(200).send(data)).catch(e=>console.log(e));
    },
    confirmBooking(req, res) {
        Booking.update({status: "confirmed"},{ where:{ bookingId: req.body.bookingId }})
        .then(data => res.status(200).send(data))
        .catch(e => console.log(e));
    },
    cancelBooking(req, res) {
        Booking.update({status: "canceled"},{ where:{ bookingId: req.body.bookingId }})
        .then(data => res.status(200).send(data))
        .catch(e => console.log(e));
    },
    cancelBookingByMedicCentre(req, res) {
        Booking.update({status: "canceledMedicCentre"},{ where:{ bookingId: req.body.bookingId }})
        .then(data => res.status(200).send(data))
        .catch(e => console.log(e));
    }
}