import { Router } from "express";
// import { CreateProduct, DeleteProductById, GetAllProducts, GetOneProductById, Login, UpdateProductById } from "../controllers/products.controllers.js";
import { body, param } from "express-validator";
// import authorizateManager from "../middlewares/managerss/authorizateManager.middleware.js";
import { CreateEmployee, DeleteEmployeeById, eLogin, GetAllEmployees, GetOneEmployeeById, UpdateEmployeeById } from "../controllers/employees.controllers.js";
import employeeExists from "../middlewares/employees/employeeExists.js";
import checkIdNumber from "../middlewares/employees/checkCodigoNumber.js";
import validateDataMiddleware from "../middlewares/validation/validateData.middleware.js";
import authorizateEmployee from "../middlewares/employees/authorizateEmployee.middleware.js";
import authorizateManager from "../middlewares/managerss/authorizateManager.middleware.js";


const employeesRouter = Router();

employeesRouter.get("/", GetAllEmployees);

employeesRouter.get("/:id",[checkIdNumber,employeeExists], GetOneEmployeeById);

employeesRouter.post("/elogin", eLogin);

employeesRouter.post("/",     [
    body("employeename", "employeename not valid").exists().isString(),
    body("codigo", "codigo invalid").exists().isString().isLength({
        min: 1,
        max: 8,
    }),
    validateDataMiddleware,
],
CreateEmployee);

employeesRouter.patch("/:id",[checkIdNumber,employeeExists,authorizateManager],UpdateEmployeeById );

employeesRouter.delete("/:id",[checkIdNumber,employeeExists,authorizateManager], DeleteEmployeeById);

export default employeesRouter;