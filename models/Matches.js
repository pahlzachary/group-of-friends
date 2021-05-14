const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Matches extends Model {}

Matches.init(
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               allowNull: false,
               autoIncrement: true
          },

          user_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'users',
                    key: 'id'
               }
          },

          group_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'campfire',
                    key: 'id'
               }
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
          modelName: 'matches',
     }
);

module.exports = Matches;