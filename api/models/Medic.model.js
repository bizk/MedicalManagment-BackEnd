module.exports = (sequelize, DataTypes) => {
    const Medic = sequelize.define('medic', {
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
    return Medic;
}