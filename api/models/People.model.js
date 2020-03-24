'use strict';

module.exports = (sequelize, DataTypes) => {
    const People = sequelize.define('people', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sureName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {});
    return People;
}