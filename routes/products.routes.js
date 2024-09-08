import { Router } from "express";
import { CreateProduct, DeleteProductById, GetAllProducts, GetOneProductById, Login, UpdateProductById } from "../controllers/products.controllers.js";
import checkIdNumber from "../middlewares/products/checkCodigoNumber.js";
import productExists from "../middlewares/products/productExists.js";
import { body, param } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";
import authorizateManager from "../middlewares/managerss/authorizateManager.middleware.js";


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

productsRouter.patch("/:id",[checkIdNumber,productExists,authorizateManager],UpdateProductById );

productsRouter.delete("/:id",[checkIdNumber,productExists,authorizateManager], DeleteProductById);

export default productsRouter;