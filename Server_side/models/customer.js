module.exports = (sequelize, DataTypes) => {
    return sequelize.define('customer', {
        Password: {
            type: DataTypes.STRING(20), 
            allowNull: true,
        },
        Name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        E_mail: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        Sex: {
            type: DataTypes.STRING(1),
            allowNull: true,
            
        },
        Specification:{
            type: DataTypes.STRING(1),
            allowNull: true,
           
        },
        Birth:{
            type: DataTypes.STRING(10),
            allowNull: true,
            
        },
        isSolar:{
            type: DataTypes.STRING(1),
            allowNull: true,
           
        },
        CertificationNum:{
            type: DataTypes.STRING(20),
            allowNull: true,
            
        },
        PhoneNum:{
            type: DataTypes.STRING(13),
            allowNull: true,
        },
        isCertificated: {
            type: DataTypes.STRING(1),
            allowNull: true,
         
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: 'local',
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true,
    });
};