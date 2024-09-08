import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Manager = dbConnection.define("Managers", {
    managername: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:false,
    },

});

Manager.sync();
export default Manager;
