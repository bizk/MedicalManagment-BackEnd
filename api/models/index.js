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

var People = require('./People.js')(sequelize, Sequelize);
var User = require('./User.js')(sequelize, Sequelize);
var Specialities = require('./speciality.model')(sequelize, Sequelize);

var MedicSpeciality = require('./MedicSpecialitys')(sequelize,Sequelize);
People.belongsToMany(Specialities, {through: MedicSpeciality,as: 'specialities'});
Specialities.belongsToMany(People, {through: MedicSpeciality, as: 'medics'});

var Booking = require('./Booking.model')(sequelize,Sequelize);

User.hasOne(People, {foreignKey: 'userUUID'});
People.belongsTo(User, {foreignKey: 'peopleUUID'});
// People.hasMany(Booking, {foreignKey: 'bookingsId'});

// Booking.belongsTo(People, {foreignKey: 'peopleUUID', as: 'Paciente'});
// Booking.belongsTo(People, {foreignKey: 'peopleUUID', as: 'Medic'});
db.User = User;
db.People = People;
db.Specialities = Specialities;
// db.Booking = Booking;
// db.WaitList = require('./WaitList.model')(sequelize,Sequelize);

module.exports = db;