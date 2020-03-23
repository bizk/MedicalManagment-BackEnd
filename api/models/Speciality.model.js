module.exports = (sequelize, Sequelize) => {
    const speciality = sequelize.define('speciality',{
        tpye: {
            type: Sequelize.STRING
        },
    });
    speciality.associate = function(models) {
        speciality.belongsToMany(models.Person, {
            foreignKey: 'userUUID',
            as: 'medic'
        });
        speciality.belongsTo(models.WaitList, {
           foreignKey: 'waitListId',
           as: 'waitList'
        });
    };
    return speciality;
}