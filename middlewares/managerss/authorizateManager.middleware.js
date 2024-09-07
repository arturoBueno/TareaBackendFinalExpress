import jwt from "jsonwebtoken";
import Manager from "../../models/managers.js";

const authorizateManager = async (req, res, next) => {
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log(token)

    try {
        const { managerId } = jwt.verify(token, "backend");
        console.log(managerId)
        const managerExists = await Manager.findOne({
            where: {
                id: +managerId,
            },
        });

        if (!managerExists) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    } catch (error) {
        return res.status(400).json({ message: "Token invalid" });
    }
};

export default authorizateManager;