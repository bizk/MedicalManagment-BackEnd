'use strict';

module.exports = function (app) {
    var controller = require('../controllers/PeopleController.js');

    app.post('/people/createPeople', (req, res) => {controller.createPeople(req, res)});

    app.get("/people/getAll", (req, res) => {controller.getAll(req, res)});

    app.get('/people/getAllMedics', (req, res) => controller.getAllMedics(req, res));
}