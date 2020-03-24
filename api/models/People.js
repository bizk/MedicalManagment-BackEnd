'use strict';

const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
    const People = sequelize.define('People', {
        peopleUUID: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: (uuid()),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sureName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // dateOfBirth: {
        //     type: Sequelize.DATE,
        // },
        dni: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    return People;
}