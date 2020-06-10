'use strict';

module.exports = function (app) {
    var controller = require('../controllers/PeopleController.js');

    app.get("/people", (req, res) => {controller.getAll(req, res)});
    app.get("/people/patients", (req, res) => {controller.getAllPatients(req, res)});
    app.get('/people/medics', (req, res) => controller.getAllMedics(req, res));
}