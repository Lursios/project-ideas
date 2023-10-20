/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import { menus as Menus } from ".";

const init_orders = (sequelize, Types) => {
  class orders extends Model {}
  orders.init({
      id: {
        type :DataTypes.STRING,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },
      quantity: DataTypes.INTEGER,
      table_number: DataTypes.INTEGER,
      menu_id: DataTypes.STRING,
      menu_name: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'orders',
    });
  orders.belongsTo(Menus,{foreignKey:"menu_id"})
    return orders;
  };

export default init_orders(connection, DataTypes);
