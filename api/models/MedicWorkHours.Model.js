module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('medicWorkingHours', {
        day: {
            type: DataTypes.DATEONLY,
            allowNull: false, 
        },
        startHour: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: ('08:00:00')
        },
        finishHour: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: ('24:00:00')
        }
    });
}