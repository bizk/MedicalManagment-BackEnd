const { Booking, People, Specialities, MedicWorkHours } = require('../models');
var moment = require('moment');
moment().format();

const Sequelize = require('sequelize');

const maxHour = moment().add(12,'h').format("YYYY-MM-DD kk:mm:ss");
const minHour = moment().add(1, 'h').format("YYYY-MM-DD kk:mm:ss");
            
module.exports = {
    createBooking(req, res) {
        let bookingDate = moment(req.body.day).format("YYYY-MM-DD");
        let localTime = moment().format("YYYY-MM-DD");
        if (bookingDate < moment(localTime).add(2,'M').format("YYYY-MM-DD") && bookingDate >= localTime) {
            var patient = People.findOne({
                where: {
                    id: req.body.patientId
                }
            });
            var medic = People.findOne({
                where: {
                    id: req.body.medicId
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
            }).then(booking => {
                Sequelize.Promise.all([booking, patient, medic, speciality]).spread((Booking, Patient, Medic, Spec) => {
                    Booking.setPatient(Patient);
                    Booking.setMedic(Medic);
                    Booking.setSpeciality(Spec);
                });
            }).then(() => res.status(200).send({message: "Succesfully created user!"})).catch(e => console.log(e));
        } else {
            res.status(300).send({message: "Solo se puede creear un turno en los proximos dos meses a la fecha."})
        }
    },

    getTurnos(req, res) {
        MedicWorkHours.findAll({
            where: {
                day: req.body.day,
                specialitySpecialityId:  req.body.specialityId
            },
            include: {
                model: People,
                include: {
                    model: Booking,
                    as: 'bookings'
                }
            }
        }).then(d => {
            // let x = d[0].person;
            // console.log(x);
            res.status(200).send(d[0])
        }).catch(e => console.log(e));
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
        Booking.findOne({ where:{ bookingId: req.body.bookingId }})
        .then(booking => {
            let arrTim = booking.time_start.split(":");
            let bookingStart = moment(booking.day).hour(arrTim[0]).minute(arrTim[1]).format("YYYY-MM-DD kk:mm:ss");
            if (bookingStart < maxHour && bookingStart > minHour) {
                Booking.update({status: "confirmed"},{ where:{ bookingId: req.body.bookingId }})
                .then(res.status(200).send({message: "Se ha confirmado con exito"}))
                .catch(e => console.log(e));
            } else {
                res.status(300).send({message: "No se puede confirmar un turno una hora antes"});
            }
        });
    },

    cancelBooking(req, res) {
        Booking.findOne({ where:{ bookingId: req.body.bookingId }})
        .then(booking => {
                let arrTim = booking.time_start.split(":");
                let bookingStart = moment(booking.day).hour(arrTim[0]).minute(arrTim[1]).format("YYYY-MM-DD kk:mm:ss");
                booking.update({status: "canceled"});
                if (bookingStart > maxHour) {
                    res.status(200).send({message: "Se ha cancelado el turno con exito"});
                } else if (bookingStart < maxHour && bookingStart >= minHour) {
                    res.status(300).send({message: "Cancelar el turno 12 horas antes generara cargas adicionales"});
                } else {
                    res.status(300).send({message: "El turno ha expirado"});
                }
            }
        ).catch(e => console.log(e));
    },
    cancelBookingByMedicCentre(req, res) {
        Booking.update({status: "canceledMedicCentre"},{ where:{ bookingId: req.body.bookingId }})
        .then(data => res.status(200).send(data))
        .catch(e => console.log(e));
    }
}