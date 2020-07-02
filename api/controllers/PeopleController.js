const { People, Booking, Specialities, User,Role, MedicWorkHours } = require('../models');
const uuid = require('uuid/v4');

module.exports = {
    createPeople(req, res) {
        People.create({
            userUUID: req.body.userUUID,
            name: req.body.name,
            sureName: req.body.sureName,
            dateOfBirth: req.body.dateOfBirth,
            dni: req.body.dni,
        })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => res.status(500));
    },

    getAll(req, res) {
        console.log("!")
        People.findAll({})
        .then(data => res.status(200).send(data))
        .catch(e => res.status(400))
    },

    getAllPatients(req, res) {
        People.findAll({
            include: [{
                model: Role,       
                where: { role: 'patient' }        
            }
            ],
        })
        .then(data => res.status(200).send(data))
        .catch(e => res.status(400))
    },

    getAllMedics(req, res) {
        People.findAll({
            include: [{
                model: Role,       
                where: { role: 'medic' }        
            }, {
                model: MedicWorkHours
            }
            ],
        })
        .then(data => res.status(200).send(data))
        .catch(e => res.status(400))
    },

    getWithUUID(req, res) {
        People.findOne({
            where: {
                userUUID: req.body.userUUID
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
};