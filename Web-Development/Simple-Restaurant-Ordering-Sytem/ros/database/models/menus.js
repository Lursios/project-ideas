/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const init_menus = (sequelize, Types) => {
  class menus extends Model {}
  menus.init({
    id: {
      type :DataTypes.STRING,
      primaryKey : true,
      autoIncrement : true,
      allowNull : false
    },
    menuName: DataTypes.STRING,
    menuPrice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menus',
  });
  return menus;
};

export default init_menus(connection, DataTypes);
