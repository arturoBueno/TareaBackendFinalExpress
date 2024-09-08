import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Employee = dbConnection.define("Empleados", {
    employeename: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },

});

Employee.sync();
export default Employee;
