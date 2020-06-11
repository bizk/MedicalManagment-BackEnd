'use strict'

module.exports = (app) =>{
    var controller = require('../controllers/MedWorkHs.Controller.js');
    
    app.get('/test/medWorkHs', (req, res)=> controller.getAll(req, res));
    // app.get('/test/medWorkHs', (req, res)=> controller.(req, res));
    app.post('/medWorkHs/getWorkHours_specDate', (req, res) => controller.getWorkHours_specDate(req, res));
    app.post('/medWorkHs/getWorkHours_specDate_Medic', (req, res) => controller.getWorkHours_specDateMedic(req, res));
}