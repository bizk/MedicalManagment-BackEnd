module.exports = (sequelize, Sequelize) => {
    const waitList = sequelize.define('waitList',{
        date: {
            type: Sequelize.DATE
        }
    });
    waitList.associate = function(models) {
        waitList.belongsToMany(models.Person, {
           foreignKey: 'userUUID', 
        });
        waitList.belongsTo(models.Speciality, {
            foreignKey: 'specialityId',
            as: 'speciality'
        })
    }
    return waitList;
}