module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mainpageimage', {
        Season: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        Type: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        Image: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};