'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        userUUID: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: (uuid()),
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    return User;
}