const {
    MedicWorkHours,
    Booking,
    People,
    Specialities,
    sequelize
} = require('../models');
const {
    Sequelize,
    Op
} = require("sequelize");
const moment = require('moment');

module.exports = {
    getAll(req, res) {
        MedicWorkHours.findAll({
            include: [{
                model: People,
            }, {
                model: Specialities,
            }]
        }).then(data => res.status(200).send(data)).catch(e => console.log(e));
    },

    getWorkHours_specDate(req, res) {
        MedicWorkHours.findAll({
                include: [{
                    model: People,
                }],
                where: {
                    day: req.body.date,
                    specialitySpecialityId: req.body.speciality
                }
            })
            .then(data => res.status(200).send(data))
            .catch(e => {
                console.log(e);
                res.status(400).send("Error al obtener los horarios por fecha")
            });
    },

    getWorkHours_specDateMedic(req, res) {
        MedicWorkHours.findAll({
                where: {
                    day: req.body.date,
                    specialitySpecialityId: req.body.speciality,
                    personId: req.body.medicId
                }
            })
            .then(data => res.status(200).send(data))
            .catch(e => console.log(e));
    },


    //Me queda ver esto de chequear que no se creen dos en la misma hora el mismo dia
    async create(req, res) {
        try { 
            Booking.findAll({where: {
                day: req.body.day,
                medicId: req.body.medicId,
                [Op.or]: [{
                    time_end: {
                        [Op.gt]: req.body.time_start,
                        [Op.lte]: req.body.time_end,
                    }
                }, {
                    time_start: {
                        [Op.gte]: req.body.time_start,
                        [Op.lt]: req.body.time_end
                    }
                }
                ]
            }})
            .then(async bk => {
                if (bk.length === 0) {
                    let startHour = req.body.time_start.split(":");
                    let hours = parseInt(startHour[0]);
                    let minutes = parseInt(startHour[1]);
        
                    let endTime = req.body.time_end.split(":");
                    let endHours = parseInt(endTime[0]);
                    let endMinutes = parseInt(endTime[1]);
        
                    let auxStartHour = hours * 100 + minutes;
                    let auxEndHour = endHours * 100 + endMinutes;
        
                    let medic = People.findOne({ where: { id: req.body.medicId }});
                    let speciality = Specialities.findOne({ where: { specialityid: req.body.specialityId } })
        
                    let toTime = "";
                    let fromTime = "";
        
                    for (auxStartHour = hours * 100 + minutes; auxStartHour <= auxEndHour; minutes += 30) {
                        if (minutes === 0) {
                            fromTime = "" + hours.toString() + ":00:00";
                            toTime = "" + hours.toString() + ":30:00";
                        } else if (minutes < 60) {
                            fromTime = "" + hours.toString() + ":30:00";
                            toTime = "" + (hours + 1).toString() + ":00:00";
                        } else {
                            minutes = 0;
                            hours += 1;
                            fromTime = "" + hours.toString() + ":00:00";
                            toTime = "" + hours.toString() + ":30:00";
                        }
                        auxStartHour = hours * 100 + minutes;
                        if (auxStartHour >= auxEndHour) break;
                        Booking.create({
                            status: "",
                            day: req.body.day,
                            time_start: fromTime,
                            time_end: toTime
                        }).then(b => {
                            Sequelize.Promise.all([b, medic, speciality]).spread((Booking, Medic, Speciality) => {
                                Booking.setMedic(Medic);
                                Booking.setSpeciality(Speciality);
                            })
                        }).then(r => res.status(200).send(r))
                        .catch(e => {
                            console.log(e);
                            res.status(400).send();
                        })
                    }
                    res.status(200).send({ message: "Operacion Exitosa"})
                } else {
                    res.status(300).send(bk);
                }
            })
            .catch(e => {
                console.log(e)
                res.status(400).send({ message: "Error" })
            })
        } catch (error) {
            res.status(400).send({ message: "Error" })
        }
    },

    async getWorkHours(req, res) {
        try {
            MedicWorkHours.findAll({
                    where: {
                        personId: req.body.medicId
                    },
                    include: [{
                            model: Booking,
                            include: [{
                                model: People,
                                as: 'patient'
                            }],
                            as: 'bookings'
                        },
                        {
                            model: Specialities,
                        }
                    ]
                })
                .then(data => res.status(200).send(data))
                .catch(e => {
                    console.log(e);
                    res.status(400).send("Error al obtener los horarios por fecha")
                });
        } catch (error) {
            res.status(400).send("Can`t get the work hours. ")
        };
    }
}