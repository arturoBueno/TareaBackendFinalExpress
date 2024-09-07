import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnection } from "./config/db.js";
import productsRouter from "./routes/products.routes.js";
//import Producto from "./models/products.js";
// import Manager from "./models/managers.js";
import managersRouter from "./routes/managers.routes.js";
const app = express();

app.use(cors());
app.use(bodyParser());

app.use("/products", productsRouter);
app.use("/managers", managersRouter);
// app.get('/', (req, res) => {
//     res.send('¡Bienvenido a la api!');
// });

// app.use("/users", usersRouter);

try {
    dbConnection.authenticate();
    console.log("Connected to DB");
} catch (error) {
    console.log(error);
}

app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});


