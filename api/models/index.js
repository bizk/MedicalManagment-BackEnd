const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
global.sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

var User = require('./User.js')(sequelize, Sequelize);
var People = require('./People.model.js') (sequelize,Sequelize);

User.hasOne(People, {foreignKey: 'userUUID'});
People.belongsTo(User, {foreignKey: 'userUUID'});

var Role = require('./Role.Model.js') (sequelize, Sequelize);

People.belongsTo(Role);
Role.hasMany(People);

var Specialities = require('./speciality.model')(sequelize, Sequelize);

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


db.User = User;
db.People = People;
db.Specialities = Specialities;
db.Booking = Booking;
db.Role = Role;
db.MedicWorkHours = MedicWorkHours;
// db.WaitList = require('./WaitList.model')(sequelize,Sequelize);

module.exports = db;