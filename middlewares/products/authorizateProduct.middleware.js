import jwt from "jsonwebtoken";
import Producto from "../../models/products.js";

const authorizateProduct = async (req, res, next) => {
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log(token)

    try {
        const { productId } = jwt.verify(token, "backend");
        console.log(productId)
        const productExists = await Producto.findOne({
            where: {
                id: +productId,
            },
        });

        if (!productExists) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    } catch (error) {
        return res.status(400).json({ message: "Token invalid" });
    }
};

export default authorizateProduct;