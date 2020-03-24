var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./api/routes/PersonRoutes.js")(app);
require("./api/routes/UserRoutes.js")(app);
require("./api/routes/Speciality.Routes.js")(app);
require("./api/routes/Booking.Routes")(app);

const db = require("./api/models");

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  }).then(() => {
    var test = require('./api/test/SampleTestData');
    test.createUsers();
    test.createPeople();
    test.createSpecialities();
    test.addMedicToSpecialities();
  });
  

var server = app.listen(port, function() {
    console.log("Running on port %s...",  server.address().port);
});

console.log("Server started successfully!");

