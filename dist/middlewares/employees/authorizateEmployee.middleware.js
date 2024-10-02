import jwt from "jsonwebtoken";
import Employee from "../../models/employees.js";
const authorizateEmployee = async (req, res, next)=>{
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log(token);
    try {
        const { employeeId } = jwt.verify(token, "backend");
        console.log(employeeId);
        const employeeExists = await Employee.findOne({
            where: {
                id: +employeeId
            }
        });
        if (!employeeExists) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Token invalid"
        });
    }
};
export default authorizateEmployee;
