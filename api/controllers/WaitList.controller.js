const {
    MedicWorkHours,
    Booking,
    People,
    Specialities,
    sequelize,
    WaitList
} = require('../models');
const {
    Sequelize,
    Op
} = require("sequelize");

module.exports = {
    getAll(req, res) {
        WaitList.findAll({ include: [{ model: People }]})
        .then(data => res.status(200).send(data))
        .catch(e => console.log(e));
    },

    getPatientList(req, res) {
        WaitList.findOne({
            include: [{
                model: People,
                as: "patient"
            }],
            where: {
                specialitySpecialityId: req.body.speciality
            }
        })
        .then(data => res.status(200).send(data))
        .catch(e => {
            console.log(e);
            res.status(400).send("Error al obtener las especialidades")
        });
    },

    addToWaitList(req, res) {
        let waitList = WaitList.findOne({
            include: [{
                model: People,
                as: "patient"
            }],
            where: {
                specialitySpecialityId: req.body.speciality
            }
        })

        let person = People.findOne({where: { id: req.body.id }})
        Sequelize.Promise.all([person, waitList]).spread((P, WL) => {
            WL.addPatient(P);
        })
        .then(res.status(200).end())
        .catch(e => console.log(e));
    },

    async create(req, res) {
        try {
            Booking.findAll({
                    where: {
                        day: req.body.day,
                        [Op.or]: [{
                            time_start: {
                                [Op.gte]: req.body.time_start,
                                [Op.lt]: req.body.time_end,
                            }
                        }, {
                            time_end: {
                                [Op.gt]: req.body.time_start,
                                [Op.lte]: req.body.time_end,
                            }
                        }]
                    }
                }).then(async Booking => {
                    if (booking.length === 0) {
                        try {
                            let startHour = req.body.time_start.split(":");
                            let hours = parseInt(startHour[0]);
                            let minutes = parseInt(startHour[1]);

                            let endTime = req.body.time_end.split(":");
                            let endHours = parseInt(endTime[0]);
                            let endMinutes = parseInt(endTime[1]);

                            let auxStartHour = hours * 100 + minutes;
                            let auxEndHour = endHours * 100 + endMinutes;

                            let medic = People.findOne({
                                where: {
                                    id: req.body.medicId
                                }
                            });
                            let speciality = Specialities.findOne({
                                where: {
                                    specialityid: req.body.specialityId
                                }
                            })

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
                                    });
                                }).catch(e => {
                                    console.log(e), res.status(400).send()
                                })
                            }
                        } catch (error) {
                            console.log(error);
                        }

                        res.status(200).send({ message: "Operacion Exitosa" });
                    } else {
                        res.status(300).send({
                            message: "Existen turnos entre medio"
                        })
                    }
                })
                .catch(e => {
                    console.log(e);
                    res.status(400).send("Algo paso");
                });
        } catch (error) {
            res.status(400).send("Something went wrong")
        }

        function createWorkHs(wkhs, med, spec) {
            Sequelize.Promise.all([wkhs, med, spec]).spread((WkHs, Medic, Spec) => {
                Medic.addMedicWorkingHours(WkHs);
                Spec.addMedicWorkingHours(WkHs);
            }).catch(e => console.log(e));
        }
    },

    async getWorkHours(req, res) {
        try {
            MedicWorkHours.findAll({ 
                where: { personId: req.body.medicId },
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