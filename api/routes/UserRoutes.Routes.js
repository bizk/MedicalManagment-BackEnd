'use strict';

module.exports = function(app) {
    var userController = require('../controllers/Users.controller');

    app.post("/users/registerUser", (req, res) => {userController.registerUser(req, res)});

    app.post("/users", (req, res) => {userController.loginUser(req, res)});

    app.get("/users", function(req, res) {
        userController.getAll(req, res);
    });
}