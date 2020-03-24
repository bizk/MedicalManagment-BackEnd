const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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


// var MedicSpeciality = require('./MedicSpecialitys')(sequelize,Sequelize);
// Patient.belongsToMany(Specialities, {through: MedicSpeciality,as: 'specialities'});
// Specialities.belongsToMany(Patient, {through: MedicSpeciality, as: 'medics'});

var Booking = require('./Booking.model')(sequelize,Sequelize);

// Patient.hasMany(Booking);
// Booking.belongsTo(Patient, { as: 'patient'});
// Booking.belongsTo(Patient, { as: 'medic'});

db.User = User;
db.People = People;
db.Specialities = Specialities;
db.Booking = Booking;
db.Role = Role;
// db.WaitList = require('./WaitList.model')(sequelize,Sequelize);

module.exports = db;