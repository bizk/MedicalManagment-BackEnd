'use strict'

module.exports = (app) =>{
    var controller = require('../controllers/MedWorkHs.Controller.js');
    
    app.post('/test/med', (req, res) => controller.create(req, res));
    app.get('/test/medWorkHs', (req, res)=> controller.getAll(req, res));
    app.post('/medWorkHs', (req, res) => controller.createMedWorkHs(req, res));
    app.post('/medWorkHs/getWorkHours_specDate', (req, res) => controller.getWorkHours_specDate(req, res));
    app.post('/medWorkHs/getWorkHours_specDate_Medic', (req, res) => controller.getWorkHours_specDateMedic(req, res));
}