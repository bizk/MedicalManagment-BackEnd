const { Role, People} = require('../models');

module.exports = {
    createRole(req, res) {
        Role.create({
            role: req.body.role
        })
    },
    getAll(req, res) {
        Role.findAll({
            include: [
                {
                    model: People,
                }
            ]
        }).then(data=>res.status(200).send(data)).catch(e=>console.log(e));
    },
}