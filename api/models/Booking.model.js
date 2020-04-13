const uuid = require('uuid/v4');
module.exports = (sequelize, DataTypes) => {
    const booking = sequelize.define('booking',{
        bookingId: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: (uuid),
        },
        day: {
            type: DataTypes.DATEONLY
        },
        time_start: {
            type: DataTypes.TIME
        },
        time_end: {
            type: DataTypes.TIME
        },
        status: {
            type: DataTypes.STRING
        }
    });
    return booking;
}