'use strict';

module.exports = (app) => {
    var specialityController = require('../controllers/Speciality.Controller.js');
    app.post('/speciality/createSpeciality', (req,res) => {specialityController.createSpeciality(req, res)});
    app.post('/speciality/addMedic', (req, res) => specialityController.addMedic(req, res));
    app.post('/speciality/getSpeciality', (req, res) => specialityController.getSpeciality(req, res));
    app.get('/speciality/getAll', (req,res) => specialityController.getAll(req,res));
}