const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//id, name , password, phone number, role

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    contact: {
        type: Sequelize.INTEGER,
        allowNull: false
    
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ispremiumuser: Sequelize.BOOLEAN
});

module.exports = User;
