module.exports = (sequelize, Sequelize) => {
    const booking = sequelize.define('booking',{
        day: {
            type: Sequelize.DATEONLY
        },
        time_start: {
            type: Sequelize.TIME
        },
        time_end: {
            type: Sequelize.TIME
        },
        status: {
            type: Sequelize.STRING
        }
    });
    return booking;
}