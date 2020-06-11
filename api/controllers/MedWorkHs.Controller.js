const { MedicWorkHours, People, Specialities } = require('../models');

module.exports = {
    getAll(req, res) {
        MedicWorkHours.findAll({
            include: [
                {
                    model: People,
                }, {
                    model: Specialities,
                }
            ]
        }).then(data => res.status(200).send(data)).catch(e => console.log(e));
    },

    getWorkHours_specDate(req, res) {
        MedicWorkHours.findAll({
            include: [
                {
                    model: People,
                }
            ],
            where: {
                day: req.body.date,
                specialitySpecialityId: req.body.speciality
            }
        })
        .then(data => res.status(200).send(data))
        .catch(e => {console.log(e); res.status(400).send("Error al obtener los horarios por fecha")});
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
}