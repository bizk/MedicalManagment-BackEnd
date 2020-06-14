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
// var moment = require('moment');

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

    async create(req, res) {
        try {
            MedicWorkHours.findAll({
                where: {
                    personId: req.body.medicId,
                    day: req.body.day,
                    [Op.or]: [
                        {
                            startHour: {
                                [Op.gte]: req.body.time_start,
                                [Op.lt]: req.body.time_end,
                            }
                        },{
                            finishHour: {
                                [Op.gt]: req.body.time_start,
                                [Op.lte]: req.body.time_end,
                            }
                        }
                    ]
                }
            })
            .then( async medwrkhr => {
                console.log(medwrkhr);
                if (medwrkhr.length === 0) {
                    try {
                        let startHour = req.body.time_start.split(":");
                        let hours = parseInt(startHour[0]);
                        let minutes = parseInt(startHour[1]);

                        let endTime = req.body.time_end.split(":");
                        let endHours = parseInt(endTime[0]);
                        let endMinutes = parseInt(endTime[1]);

                        let auxStartHour = hours * 100 + minutes;
                        let auxEndHour = endHours * 100 + endMinutes;

                        let medic = People.findOne({ where: { id: req.body.medicId } });
                        let speciality = Specialities.findOne({ where: { specialityid:  req.body.specialityId } })
                
                        const workingHours =  MedicWorkHours.create({
                                day: req.body.day,
                                startHour: req.body.time_start,
                                finishHour: req.body.time_end
                            }).then(wk => createWorkHs(wk,medic,speciality))
                        .catch(e => res.status(400).send("Error al crear el horairo"));
                        
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
                            console.log(fromTime, toTime) 
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
                            }).catch(e => {console.log(e), res.status(400).send()})
                            
                        }
                    } catch (error) {
                        console.log( error);
                    }

                    res.status(200).send({
                        message: "Operacion Exitosa"
                    });
                } else {
                    res.status(300).send({
                        message: "Existen turnos entre medio"
                    })
                }
            })
            .catch(e =>{
                console.log(e);
                res.status(400).send("Algo paso");
            });
        } catch (error) {
            res.status(400).send("Something went wrong")
        }

        function createWorkHs(wkhs, med, spec) {
            Sequelize.Promise.all([wkhs, med, spec]).spread((WkHs, Medic, Spec) => {
                Medic.addMedicWorkingHours(WkHs);
                // Spec.addMedicWorkingHours(WkHs);
            }).catch(e => console.log(e));
        }
    },
    
}