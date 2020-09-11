module.exports = (sequelize, DataTypes) => {
    return sequelize.define('board', {
        Specification: {
            type: DataTypes.STRING(1),
            allowNull: false,
            primarykey: true,
        },
        Title: {
            type: DataTypes.STRING(100),
            allowNull: false,
          
        },
        Contents:{
            type: DataTypes.STRING(2000),
            allowNull: true,
        },
        Writer: {
            type: DataTypes.STRING(15),
            allowNull: true,
            defaultValue: DataTypes.INTEGER,
        },
        Hit: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        isHidden: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid : true,
    });
};