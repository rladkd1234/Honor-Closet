module.exports = (sequelize, DataTypes) => {
    return sequelize.define('donateproduct', {
        Name: {
            type: DataTypes.STRING(6),
            allowNull: false,
            primaryKey: true,
        },
        Department: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,      
        },
        DonateDate: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};