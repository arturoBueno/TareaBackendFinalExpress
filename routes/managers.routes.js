import { Router } from "express";
// import { CreateProduct, DeleteProductById, GetAllProducts, GetOneProductById, Login, UpdateProductById } from "../controllers/products.controllers.js";
import checkIdNumber from "../middlewares/managerss/checkCodigoNumber.js";
import { body, param } from "express-validator";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";
// import authorizateProduct from "../middlewares/products/authorizateProduct.middleware.js";
import { CreateManager, DeleteManagerById, GetAllManagers, GetOneManagerById, mLogin, UpdatemanagerById } from "../controllers/managers.controllers.js";
// import managerExists from "../middlewares/managerss/ManagerExists.js";
import authorizateManager from "../middlewares/managerss/authorizateManager.middleware.js";
import managerExists from "../middlewares/managerss/managerExists.js";

const managersRouter = Router();

managersRouter.get("/", GetAllManagers);

managersRouter.get("/:id",[checkIdNumber,managerExists], GetOneManagerById);

managersRouter.post("/mlogin", mLogin);

managersRouter.post("/",     [
    body("managername", "managername not valid").exists().isString(),
    body("codigo", "codigo invalid").exists().isString().isLength({
        min: 1,
        max: 8,
    }),
    validateDataMiddleware,
],
CreateManager);

managersRouter.patch("/:id",[checkIdNumber,managerExists,authorizateManager,
    param("id", "id not valid").exists().isString(),
    body("managername", "managername not valid").exists().isString(),
    body("codigo", "codigo invalid").exists().isString().isLength({
        min: 1,
        max: 8,
    }),
    validateDataMiddleware,
],UpdatemanagerById );

managersRouter.delete("/:id",[checkIdNumber,managerExists,authorizateManager], DeleteManagerById);

export default managersRouter;