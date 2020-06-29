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

    getSpeciality(req, res) {
        Specialities.findAll({
            include: [{
                model: People,
                where: {
                    id: req.body.medicId
                },
                as: 'medics',
            }]
        }).then(data => res.status(200).send(data))
        .catch(e => console.log(e));
    }
}