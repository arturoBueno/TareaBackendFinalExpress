import Producto from "../models/products.js";
import jwt from 'jsonwebtoken';


export const GetAllProducts = async (req, res) => {
    const productos = await Producto.findAll();
    res.json(productos);
};

export const GetOneProductById = async(req, res) => {
    const productos = await Producto.findOne({
      where: {
          id: req.params.id,
      }
      });
      res.json(productos);
};

export const CreateProduct = async (req, res) => {
    const productToCreate = req.body;

    await Producto.create(productToCreate);

    res.status(201).json(productToCreate);
};

export const UpdateProductById = async (req, res) => {
    await Producto.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
  
    const productUpdated = await Producto.findOne({
      where: {
          id: +req.params.id,
      },
  });
  
  console.log(productUpdated);
  
  res.json(productUpdated);
  };

  export const DeleteProductById = async (req, res) => {
    const ProductToDelete = await Producto.findOne({
        where: {
            id: +req.params.id,
        },
    });
  
    await Producto.destroy({
        where: {
            id: +req.params.id,
        },
    });
  
    res.json(ProductToDelete);
  };
//Autorizacion

  export const  Login = async (req, res) => {
    const { productname, codigo } = req.body;

    const producto = await Producto.findOne({
        where: {
            productname: productname,
            codigo: codigo,
        },
    });

    if (!producto) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ productId: producto.id }, "backend", {
        expiresIn: 60 * 60,
    });

    res.json({ token: token });
};