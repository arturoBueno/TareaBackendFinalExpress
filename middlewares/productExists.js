import Producto from "../models/products.js";

const productExists = async (req, res, next) => {
    const product = await Producto.findOne({
        where: {
          id: +req.params.id,
        },
      });
    
      if (!product) {
        res.status(404).json({ message: "User not found" });
        return;
      }
    
      next();
    };

export default productExists;