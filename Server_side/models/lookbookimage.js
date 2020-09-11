module.exports = (sequelize, DataTypes) => {
    return sequelize.define('lookbookimage', {
        Season: {
            type: DataTypes.STRING(4),
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