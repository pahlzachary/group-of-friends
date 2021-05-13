const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Match extends Model {}

Match.init(
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               allowNull: false,
               autoIncrement: true
          },

          user_id: {
               type: DataTypes.INTEGER,
          },

          group_id: {
               type: DataTypes.INTEGER,
          },

          matched: {
               type: DataTypes.BOOLEAN
          }
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'match',
     }
);

module.exports = Match;