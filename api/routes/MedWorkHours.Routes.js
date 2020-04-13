'use strict'

module.exports = (app) =>{
    var controller = require('../controllers/MedWorkHs.Controller.js');
    app.get('/medWorkHs/getAll', (req, res)=> controller.getAll(req, res));
}