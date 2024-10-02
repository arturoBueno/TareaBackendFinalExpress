import Manager from "../models/managers.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
export const GetAllManagers = async (req, res)=>{
    const managers = await Manager.findAll();
    res.json(managers);
};
export const GetOneManagerById = async (req, res)=>{
    const managers = await Manager.findOne({
        where: {
            id: req.params.id
        }
    });
    res.json(managers);
};
// --------------------------------------------------------------
// export const CreateManager = async (req, res) => {
//     const managerToCreate = req.body;
//     await Manager.create(managerToCreate);
//     res.status(201).json(managerToCreate);
// };
// --------------------------------------------------------------
export const CreateManager = async (req, res)=>{
    const { managername, codigo } = req.body;
    // Encriptar la contraseña antes de guardar
    const hashedCodigo = await bcryptjs.hash(codigo, 10);
    const managerToCreate = {
        managername,
        codigo: hashedCodigo // Guardar la contraseña encriptada
    };
    await Manager.create(managerToCreate);
    res.status(201).json(managerToCreate);
};
// --------------------------------------------------------------
export const UpdatemanagerById = async (req, res)=>{
    await Manager.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const managerUpdated = await Manager.findOne({
        where: {
            id: +req.params.id
        }
    });
    console.log(managerUpdated);
    res.json(managerUpdated);
};
export const DeleteManagerById = async (req, res)=>{
    const ManagerToDelete = await Manager.findOne({
        where: {
            id: +req.params.id
        }
    });
    await Manager.destroy({
        where: {
            id: +req.params.id
        }
    });
    res.json(ManagerToDelete);
};
//Autorizacion Manager
//   export const  mLogin = async (req, res) => {
//     const { managername, codigo } = req.body;
//     const manager = await Manager.findOne({
//         where: {
//             managername: managername,
//             codigo: codigo,
//         },
//     });
//     if (!manager) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign({ managerId: manager.id }, "backend", {
//         expiresIn: 60 * 60,
//     });
//     res.json({ token: token });
// };
// --------------------------------------------------------------
export const mLogin = async (req, res)=>{
    const { managername, codigo } = req.body;
    // Buscar el manager por nombre
    const manager = await Manager.findOne({
        where: {
            managername: managername
        }
    });
    if (!manager) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }
    // Verificar si la contraseña proporcionada coincide con la encriptada
    const iscodigoValid = await bcryptjs.compare(codigo, manager.codigo);
    if (!iscodigoValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }
    // Generar el token JWT
    const token = jwt.sign({
        managerId: manager.id
    }, "backend", {
        expiresIn: 60 * 60
    });
    res.json({
        token: token
    });
};
