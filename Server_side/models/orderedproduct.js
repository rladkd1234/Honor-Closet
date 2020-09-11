module.exports = (sequelize, DataTypes) => {
    return sequelize.define('orderedproduct', {
        Order_NO: {
            type: DataTypes.STRING(11),
            allowNull: false,
            primarykey: true,
        },
        Product_code: {
            type: DataTypes.STRING(6),
            allowNull: false,
            primarykey: true,
        },
    }, {
        timestamps: true,
        paranoid : true,
    });
};