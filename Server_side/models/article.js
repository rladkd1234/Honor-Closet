module.exports = (sequelize, DataTypes) => {
    return sequelize.define('article', {
        No: {
            type: DataTypes.INTEGER(5),
            allowNull: false,
            unique: true,
            primarykey: true,
        },
        Title:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        Thumbnail:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        URL:{
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        Date:{
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};