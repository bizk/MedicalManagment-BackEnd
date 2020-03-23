'use strict';

module.exports = function(app) {
    var userController = require('../controllers/Users.controller.JS');

    app.post("/users/registerUser", (req, res) => {userController.registerUser(req, res)});

    app.post("/users/loginUser", (req, res) => {userController.loginUser(req, res)});

    app.get("/users/getUsers", function(req, res) {
        userController.getAll(req, res);
    });
}