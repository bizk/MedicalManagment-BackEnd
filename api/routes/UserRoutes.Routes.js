'use strict';

module.exports = function(app) {
    var userController = require('../controllers/Users.controller');

    app.post("/test/users", (req, res) => {userController.registerUser(req, res)});

    app.post("/users", (req, res) => {userController.loginUser(req, res)});

    app.get("/test/users", function(req, res) {
        userController.getAll(req, res);
    });
}