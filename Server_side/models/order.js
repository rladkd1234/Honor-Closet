module.exports = (sequelize, DataTypes) => {
    return sequelize.define('order', {
        OrderDate: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        SaleDate: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        Price: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        RefundDate:{
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        isCash:{
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        Customer_ID:{
            type: DataTypes.STRING(15),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};