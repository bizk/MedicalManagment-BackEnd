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
    }
}