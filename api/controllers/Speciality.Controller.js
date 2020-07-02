const {Specialities, People, WaitList} = require('../models');
const Sequelize = require('sequelize');

module.exports = {
    createSpeciality(req, res) {
        try {  
            Specialities.create({ type: req.body.type })
            .then(data => {
                WaitList.create({id: data.id})
                .then(wl => wl.setSpeciality(data))
                .then(res.status(200))
                .catch(e => console.log(e));
            })
            .catch(e => {
                res.status(400).end();
                console.log(e.message)
            });
        } catch (error) {
            res.status(400).end();
            throw error;
        }
    },

    addSpecialityToMedic(req, res) {
        try {  
            Specialities.findOne({where: { id: req.body.specialityId }})
            .then(spec => {
                console.log(spec);
                People.findOne({where: {id: req.body.medicId}})
                .then(person => {
                    console.log(person)
                    console.log(spec)
                    return Sequelize.Promise.all([spec, person]).spread((Spec, Medic) => {
                        return Spec.addMedic([Medic]);
                    });
                }).then(res.status(200).send())
                .catch(e => res.status(301).send(e));
            })
            .then(res.status(200).send())
            .catch(e => res.status(300).end());
        } catch (error) {
            res.status(400).end();
            throw error;
        }
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