'use strict';

module.exports = function (app) {
    var PeopleController = require('../controllers/PeopleController.js');

    app.post('/person/createPerson', (req, res) => {PeopleController.createPerson(req, res)});

    app.get("/person/getAll", (req, res) => {PeopleController.getAll(req, res)});

    app.get('/person/getAllMedics', (req, res) => PeopleController.getAllMedics(req, res));

    app.get('/person/getAllPatients', (req, res) => PeopleController.getAllPatients(req, res));

    app.post('/person/getWithUUID', (req, res) => PeopleController.getWithUUID(req, res));
}