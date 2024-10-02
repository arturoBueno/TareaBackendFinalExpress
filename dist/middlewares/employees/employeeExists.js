import Empleado from "../../models/employees.js";
const employeeExists = async (req, res, next)=>{
    const employee = await Empleado.findOne({
        where: {
            id: +req.params.id
        }
    });
    if (!employee) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    next();
};
export default employeeExists;
