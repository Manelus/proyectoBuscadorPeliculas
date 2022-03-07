'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tokens.belongsTo(models.usuarios,{
        foreignKey: "idUser",
        onDelete:"cascade"
      })
    }
  }
  tokens.init({
    token: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tokens',
  });
  return tokens;
};