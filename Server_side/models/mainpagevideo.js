module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mainpagevideo', {
        Season: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        Video: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};