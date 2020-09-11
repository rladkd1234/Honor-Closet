module.exports = (sequelize, DataTypes) => {
    return sequelize.define('member', {
        Name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        Season:{
            type: DataTypes.STRING(4),
            allowNull: false
        },
        major: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        Image:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
      
    }, {
        timestamps: false,
    });
};

// #노드 #익스프레스