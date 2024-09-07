import { Router } from "express";
import { CreateProduct, DeleteProductById, GetAllProducts, GetOneProductById, Login, UpdateProductById } from "../controllers/products.controllers.js";
import checkIdNumber from "../middlewares/checkCodigoNumber.js";
import productExists from "../middlewares/productExists.js";
import { body, param } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";
import authorizateProduct from "../middlewares/authorizateProduct.middleware.js";


const productsRouter = Router();

productsRouter.get("/", GetAllProducts);

productsRouter.get("/:id",[checkIdNumber,productExists], GetOneProductById);

productsRouter.post("/login", Login);

productsRouter.post("/",     [
    body("productname", "productname not valid").exists().isString(),
    body("codigo", "codigo invalid").exists().isString().isLength({
        min: 1,
        max: 8,
    }),
    validateDataMiddleware,
],
CreateProduct);

productsRouter.patch("/:id",[checkIdNumber,productExists],UpdateProductById );

productsRouter.delete("/:id",[checkIdNumber,productExists,authorizateProduct], DeleteProductById);

export default productsRouter;