'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("roles", {
        roleUUID: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: (uuid())
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    return Role;
}