const { People, Specialities, User,MedicSpeciality } = require('../models');
const uuid = require('uuid/v4');

module.exports = {
    createPerson(req, res) {
        People.create({
            peopleUUID: req.body.peopleUUID,
            name: req.body.name,
            sureName: req.body.sureName,
            // dateOfBirth: req.body.dateOfBirth,
            dni: req.body.dni,
            role: req.body.role
        })
        .then(data => {console.log(data); res.status(200).send(data)})
        .catch(e => res.status(500));
    },

    getAll(req, res) {
        People.findAll({
            include: [
                {
                    model: User
                }
            ]
        })
        .then(data => res.status(200).send(data))
        .catch(e => res.status(500))
    },

    getWithUUID(req, res) {
        People.findOne({
            where: {
                peopleUUID: req.body.peopleUUID
            },
            include:[
                {
                    model: Specialities,
                    as: "specialities"
                }
            ]
        }).then(data =>{
            res.status(200).send(data);
        })
        .catch(e => console.log(e.message));
    },

    getAllMedics(req, res) {
        People.findAll({
            where: {
                role: "Médic"
            },
            include:[
                {
                    through: MedicSpeciality,
                    model: Specialities,
                    as: "specialities"
                }
            ]
        })
        .then(data => res.status(200).send(data))
        .catch(e => res.status(500))
    },
    
    getAllPatients(req, res) {
        People.findAll({
            where: {
                role: "Paciente"
            }
        })
        .then(data => res.status(200).send(data))
        .catch(e => res.status(500))
    }
};