const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const MeetUp = sequelize.define('meetUp', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    keywords: {type: DataTypes.STRING}, 
    eventInformation: {type: DataTypes.STRING, allowNull: false}
})
module.exports = {
    MeetUp
}