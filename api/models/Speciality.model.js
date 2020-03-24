const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
    const speciality = sequelize.define('speciality',{
        specialityId: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: (uuid()),
        },
        tpye: {
            type: DataTypes.STRING
        },
    });
    return speciality;
}