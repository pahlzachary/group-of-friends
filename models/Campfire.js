const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


//Create Campfire Model
class Campfire extends Model {}

//Define tables
Campfire.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true
          },

          group_name : {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
          },

          group_email: {
               type: DataTypes.STRING,
               allowNull: false,
               validate:  {
                    isEmail: true
               }
          },

          group_location: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                    len: [5]
               }
          },

          activity_title: {
               type: DataTypes.STRING,
               allowNull: false,
          },

          activity_description: {
               type: DataTypes.TEXT,
               allowNull: false
          },

          activity_date: {
               type: DataTypes.DATE,
               allowNull: false,
               validate: {
                    isDate: true,
               }
          },

          open_slots: {
               type: DataTypes.INTEGER,
               allowNull: false,
               validate: {
                    min: 1
               }
          },

          creating_user_id: {
               type: DataTypes.INTEGER,
               // references: {
               //      model: 'user',
               //      key: 'id'
               // }
          }
     
     },
     {
          sequelize,
          freezeTableName: true,
          underscored: true,
          createdAt: false,
          updatedAt: false,
          modelName: 'campfire'
     }
);

module.exports = Campfire;