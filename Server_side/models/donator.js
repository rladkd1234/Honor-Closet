module.exports = (sequelize, DataTypes) => {
    return sequelize.define('donator', {
        Name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }, 
        Season: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};