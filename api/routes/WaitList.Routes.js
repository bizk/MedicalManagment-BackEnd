'use strict';

module.exports = function(app) {
    var waitListController = require('../controllers/WaitList.controller');

    app.get('/test/waitList', (req, res) => {waitListController.getAll(req, res)});

    app.post("/waitList", (req, res) => { waitListController.getPatientList(req, res)});

    app.put("/waitList", (req, res) => { waitListController.addToWaitList(req, res)});
}