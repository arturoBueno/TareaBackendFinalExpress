import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";
const Producto = dbConnection.define("Productos", {
    productname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});
Producto.sync();
export default Producto;
