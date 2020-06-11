const { User, People, Role } = require('../models');

//Create a new user
const uuid = require('uuid/v4');

module.exports = {
    //We gotta work over encrpytion in values
    registerUser(req, res) {
        User.create({
            userUUID: uuid(),
            mail: req.body.mail,
            password: req.body.password
        })
            .then(data => {res.status(200).send(data)})
            .catch(err => {res.status(500).send({
                message:
                err.message || "Some error occurred while creating the user."
                })
            }); 
    },

    loginUser(req, res) {
        console.log(req.body);
        User.findOne({
            where: {
                mail: req.body.mail,
                password: req.body.password
            }, 
            include: [{
                model: People,
                include: [{
                    model: Role,
                }]
            }]
        }).then(data => {res.status(200).send(data.dataValues.person)})
            .catch(e => {res.status(400).send({
                message: e.message || "Some error occurred while creating the user."
            })
        })
    },

    getAll(req, res) {
        User.findAll({})
            .then(data => {res.status(200).send(data)})
            .catch(err => {res.status(500).send({
                message: err.message || "Some error ocurred while fetching the users"
                })
            }
        )
    }
}; 