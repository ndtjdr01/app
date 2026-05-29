import express from "express";

import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);

productRouter.post("/", createProduct);

productRouter.get("/:id", getProductById);

productRouter.put("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);
export default productRouter;