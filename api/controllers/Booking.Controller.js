const { Booking, People, Specialities, MedicWorkHours } = require('../models');
var moment = require('moment');

const {Op, Sequelize} = require('sequelize');

const maxHour = moment().add(12,'h').format("YYYY-MM-DD kk:mm:ss");
const minHour = moment().add(1, 'h').format("YYYY-MM-DD kk:mm:ss");
            
module.exports = {
    createBooking(req, res) {
        let patient = People.findOne({where: {id: req.body.id}});
        Booking.update({status: "reservado"},{ where:{ bookingId: req.body.bookingId }})
        
        Booking.findOne({where:{ bookingId: req.body.bookingId }})
        .then(booking => {
            Sequelize.Promise.all([booking, patient]).spread((Booking, Patient) => {
                Booking.setPatient(Patient);
            });
        })
        .then(result => res.status(200).send({message: "Turno agendado con exito!"}))
        .catch(e => {console.log(e), res.status(400).send()})
    },

    getTurnos_specialityDay_days(req, res) {
        Booking.findAll({
            where: {
                status: "",
                specialitySpecialityId: req.body.specialityId,
            },
            attributes: ['day'],
            group: ['day'],
        }).then(d => {
            res.status(200).send(d)
        }).catch(e => {console.log(e); res.status(400).send()});
    },

    getTurnos_specialityDay_medics(req, res) {
        Booking.findAll({
            where: {
                status: "",
                day: req.body.day,
                specialitySpecialityId: req.body.specialityId
            },
            attributes: ['specialitySpecialityId'],
            include: [
                {
                    model: People,
                    as: 'medic',
                    attributes: ["id", "name", "sureName"],
                }
            ],
            group: ['medic.id']
        }).then(d => {
            res.status(200).send(d)
        }).catch(e => {console.log(e); res.status(400).send()});
    },

    getTurnos_specialityDay_hours(req, res) {
        Booking.findAll({
            where: {
                status: "",
                day: req.body.day,
                specialitySpecialityId: req.body.specialityId,
                medicId: req.body.medicId
            },
            attributes: [`bookingId`,'time_start', 'time_end'],
        }).then(d => {
            res.status(200).send(d)
        }).catch(e => {console.log(e); res.status(400).send()});
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
            if (bookingStart < maxHour && bookingStart > minHour && booking.status === "") {
                Booking.update({status: "confirmed"},{ where:{ bookingId: req.body.bookingId }})
                .then(res.status(200).send({message: "Se ha el turno confirmado con exito"}))
                .catch(e => console.log(e));
            } else {
                res.status(300).send({message: "No se puede confirmar un turno una hora antes"});
            }
        })
        .catch(e => {console.log(e); res.status(400).send("error")});
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
                    res.status(301).send({message: "El turno ha expirado"});
                }
            }
        ).catch(e => console.log(e));
    },

    cancelBookingByMedicCentre(req, res) {
        Booking.update({status: "canceledMedicCentre"},{ where:{ bookingId: req.body.bookingId }})
        .then(data => res.status(200).send({message: "Booking cancelado por centro medico"}))
        .catch(e => {console.log(e), res.status(400)});
    },

    getById_patient(req, res) {
        console.log("hola", req.body);
        Booking.findAll({
            where: {
                patientId: req.body.id,
                day: {
                    [Op.gte]: moment().format("YYYY-MM-DD"),
                    [Op.lte]: moment().add(2, "M").add(1, "d").format("YYYY-MM-DD")
                }
            },
            include: [
                {
                    model: Specialities,
                    as: 'speciality'
                },
                {
                    model: People,
                    as: 'medic'
                }
            ]
        }).then(data=>res.status(200).send(data))
        .catch(e => {console.log(e), res.status(400).send()});
    },

    getById_medic(req, res) {
        Booking.findAll({
            where: {
                medicId: req.body.id
            },
            include: [
                {
                    model: Specialities,
                    as: 'speciality'
                },
                {
                    model: People,
                    as: 'patient'
                }
            ]
        }).then(data=>res.status(200).send(data)).catch(e => {console.log(e), res.status(400).send()});
    },
}