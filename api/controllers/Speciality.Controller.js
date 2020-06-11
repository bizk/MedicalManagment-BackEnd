const {Specialities, People} = require('../models');
module.exports = {
    createSpeciality(req, res) {
        Specialities.create({
            tpye: req.body.type
        }).then(data => res.status(200).send(data))
        .catch(e => console.log(e.message));
    },

    getAll(req, res) {
        Specialities.findAll({

        }).then(data=>res.status(200).send(data)).catch(e => console.log(e));
    },

    // getSpeciality(req, res) {
    //     Speciality.findOne({
    //         where: {
    //             specialityId: req.body.speciality
    //         }, include: [{
    //             model: People,
    //             as: 'medics'
    //         }]
    //     }).then(dataa => res.status(200).send(data))
    //     .catch(e => console.log(e));
    // }
}