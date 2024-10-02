import Manager from "../../models/managers.js";
const managerExists = async (req, res, next)=>{
    const manager = await Manager.findOne({
        where: {
            id: +req.params.id
        }
    });
    if (!manager) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    next();
};
export default managerExists;
