var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./resources/swagger.yaml');

var app = express();
var port = process.env.PORT || 8080;

var options = {
  explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(bodyParser.urlencoded(
  {
      extended: true
  }));
app.use(bodyParser.json());
app.use(cors())

require("./api/routes/People.Routes.js")(app);
require("./api/routes/Role.Routes.js")(app);
require("./api/routes/UserRoutes.Routes")(app);
require("./api/routes/Speciality.Routes.js")(app);
require("./api/routes/Booking.Routes")(app);
require("./api/routes/MedWorkHours.Routes")(app);

const db = require("./api/models");

let forceSync = true;
db.sequelize.sync({ force: forceSync }).then(() => {
    console.log("Drop and re-sync db.");
  }).then(() => {
    var test = require('./api/test/SampleTestData');
    if (test.createSampleData()) {
      test.createSampleData();
    }
  });
  
var server = app.listen(port, function() {
    console.log("Running on port %s...",  server.address().port);
});

console.log("Server started successfully!");

