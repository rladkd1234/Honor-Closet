module.exports = (sequelize, DataTypes) => {
    return sequelize.define('product', {
        Code: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        Specification: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        Info: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        },
        FirstPrice:{
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        DiscountRate:{
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        LastPrice:{
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        Progress:{
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        Seller_ID:{
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        Buyer_ID:{
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        Thumbnail:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Image1:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Image2:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Image3:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Image4:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Video:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Hit:{
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};