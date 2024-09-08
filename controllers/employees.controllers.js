import Employee from "../models/employees.js";
import jwt from 'jsonwebtoken';


export const GetAllEmployees = async (req, res) => {
    const empleados = await Employee.findAll();
    res.json(empleados);
};

export const GetOneEmployeeById = async(req, res) => {
    const empleados = await Employee.findOne({
      where: {
          id: req.params.id,
      }
      });
      res.json(empleados);
};

export const CreateEmployee = async (req, res) => {
    const employeeToCreate = req.body;

    await Employee.create(employeeToCreate);

    res.status(201).json(employeeToCreate);
};

export const UpdateEmployeeById = async (req, res) => {
    await Employee.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
  
    const EmployeeUpdated = await Employee.findOne({
      where: {
          id: +req.params.id,
      },
  });
  
  console.log(EmployeeUpdated);
  
  res.json(EmployeeUpdated);
  };

  export const DeleteEmployeeById = async (req, res) => {
    const EmployeeToDelete = await Employee.findOne({
        where: {
            id: +req.params.id,
        },
    });
  
    await Employee.destroy({
        where: {
            id: +req.params.id,
        },
    });
  
    res.json(EmployeeToDelete);
  };

//Autorizacion

  export const  eLogin = async (req, res) => {
    const { employeename, codigo } = req.body;

    const empleado = await Employee.findOne({
        where: {
            employeename: employeename,
            codigo: codigo,
        },
    });

    if (!empleado) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ employeeId: empleado.id }, "backend", {
        expiresIn: 60 * 60,
    });

    res.json({ token: token });
};