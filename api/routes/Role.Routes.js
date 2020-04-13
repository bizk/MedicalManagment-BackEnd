'use strict';

module.exports = function (app) {
    var controller = require('../controllers/Role.Controller.js');

    app.post('/role/createRole', (req, res) => {controller.createRole(req, res)});

    app.get("/role/getAll", (req, res) => {controller.getAll(req, res)});

}