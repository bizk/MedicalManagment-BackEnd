'use strict';

module.exports = (app) => {
    var specialityController = require('../controllers/Speciality.Controller.js');
    
    // app.put('/speciality', (req,res) => {specialityController.createSpeciality(req, res)});
    app.post('/speciality/medics', (req, res) => specialityController.getSpeciality(req, res));
    app.get('/speciality', (req,res) => specialityController.getAll(req,res));
}