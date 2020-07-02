var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./resources/swagger.yaml');

//Inicializamos la api REST
var app = express();
var port = process.env.PORT || 8080; //Seteamos el puerto por defecto 8080 o en el que se sete por defecto

//Seteamos la pagina de documentacion en el endpoint /docs
var options = {explorer: true };
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(bodyParser.urlencoded({ extended: true })); //Setea true para recibir reuest en el url
app.use(bodyParser.json()); //nOS PERMITE RECIBIR La informaicon en el body del request como JSON
app.use(cors()) //Habilita conexion segura HTTPS

//Seteamos los endpoints, cada uno llama a un archivo de endppoints distinto
require("./api/routes/People.Routes.js")(app);
require("./api/routes/Role.Routes.js")(app);
require("./api/routes/UserRoutes.Routes")(app);
require("./api/routes/Speciality.Routes.js")(app);
require("./api/routes/Booking.Routes")(app);
require("./api/routes/MedWorkHours.Routes")(app);
require("./api/routes/WaitList.Routes")(app);

//Traemos los modelos de base de datos definidos en la carpeta /models
const db = require("./api/models");

//Sincroniza la base de datos
let forceSync = true; //Cuando esta en verdadero nos permite  levantar la base de datos de nuevo y generar los test de carga
db.sequelize.sync({ force: forceSync }).then(() => {
    console.log("Drop and re-sync db.");
  }).then(() => {
    var test = require('./api/test/SampleTestData');
    if (forceSync) {
      test.createSampleData(); //Datasets con informacion pre cargada
    }
  });
  
//Ponemos la api rest operativa
var server = app.listen(port, function() {
    console.log("Running on port %s...",  server.address().port);
});

console.log("Server started successfully!");

