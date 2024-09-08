import {Sequelize}  from "sequelize";

export const dbConnection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mariadb",
        pool: {
            max: 10,        // Número máximo de conexiones
            min: 0,         // Número mínimo de conexiones
            acquire: 30000, // Tiempo máximo de espera antes de lanzar un error (en milisegundos)
            idle: 10000     // Tiempo que puede estar una conexión inactiva antes de ser liberada (en milisegundos)
        }
    }
);