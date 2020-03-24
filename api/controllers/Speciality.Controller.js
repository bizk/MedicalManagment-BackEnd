const {Specialities, People} = require('../models');
module.exports = {
    createSpeciality(req, res) {
        Specialities.create({
            tpye: req.body.type
        }).then(data => res.status(200).send(data))
        .catch(e => console.log(e.message));
    },

    addMedic(req, res) {
        var speciality =  Specialities.findOne({
            where: req.body.speciality
        })
        People.findOne({
            where: {
                peopleUUID: req.body.peopleUUID,
                role: "medic"
            }
        }).then(medic => {
           medic.addSpeciality(speciality);
           speciality.addMedic(medic);
           res.status(200).send(medic); 
        })
        .catch(e => console.log(e));
    },

    getAll(req, res) {
        Specialities.findAll({
            include: [{
                model: People,
                as: 'medics'
            }]
        }).then(data=>res.status(200).send(data)).catch(e => console.log(e));
    },

    getSpeciality(req, res) {
        Speciality.findOne({
            where: {
                type: req.body.speciality
            }
        }).then(dataa => res.status(200).send(data))
        .catch(e => console.log(e));
    }
}