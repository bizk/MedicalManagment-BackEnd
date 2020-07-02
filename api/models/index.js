require('dotenv').config()
//Dotenv carga el archivo .env del enviroment con la informacion sensible

const Sequelize = require('sequelize');

//Configuramos la base de datos
global.sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Traemos los modelos y creamos las relaciones
var User = require('./User.js')(sequelize, Sequelize);
var People = require('./People.model.js') (sequelize,Sequelize);

User.hasOne(People, {foreignKey: 'userUUID'});
People.belongsTo(User, {foreignKey: 'userUUID'});

var Role = require('./Role.Model.js') (sequelize, Sequelize);

People.belongsTo(Role);
Role.hasMany(People);

var Specialities = require('./Speciality.model')(sequelize, Sequelize);

var MedicSpeciality = require('./MedicSpecialitys')(sequelize,Sequelize);
People.belongsToMany(Specialities, {through: MedicSpeciality,as: 'specialities'});
Specialities.belongsToMany(People, {through: MedicSpeciality, as: 'medics'});

var Booking = require('./Booking.model')(sequelize,Sequelize);

People.hasMany(Booking, { as: 'bookings'});
Booking.belongsTo(People, { foreignKey:'patientId', as: 'patient'});
Booking.belongsTo(People, { foreignKey:'medicId', as: 'medic'});
Specialities.hasMany(Booking, { as: 'bookings'});
Booking.belongsTo(Specialities);

let MedicWorkHours = require('./MedicWorkHours.Model.js')(sequelize, Sequelize);
People.hasMany(MedicWorkHours);
MedicWorkHours.belongsTo(People);
Specialities.hasMany(MedicWorkHours);
MedicWorkHours.belongsTo(Specialities);
Booking.belongsTo(MedicWorkHours);
MedicWorkHours.hasMany(Booking, { as: 'bookings'});

let WaitList = require('./WaitList.model')(sequelize,Sequelize);
let WaitListPatient = require(`./WaitListPatient.model`)(sequelize, Sequelize);
WaitList.belongsToMany(People, {through: WaitListPatient, as: 'patient'});
People.belongsToMany(WaitList, {through: WaitListPatient, as: 'waitList'});
Specialities.hasOne(WaitList);
WaitList.belongsTo(Specialities, {as: "speciality"});

//Definimos en la base de datos los modelos
db.User = User;
db.People = People;
db.Specialities = Specialities;
db.Booking = Booking;
db.Role = Role;
db.MedicWorkHours = MedicWorkHours;
db.WaitList = WaitList;

module.exports = db;