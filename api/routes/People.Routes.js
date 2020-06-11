'use strict';

module.exports = function (app) {
    var controller = require('../controllers/PeopleController.js');

    app.get("/test/people", (req, res) => {controller.getAll(req, res)});
    app.get("/test/people/patients", (req, res) => {controller.getAllPatients(req, res)});
    app.get('/test/people/medics', (req, res) => controller.getAllMedics(req, res));
}