import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    registerUser,
    loginUser,
    getCart,
    addToCart,
    removeFromCart,
} from "../controllers/userController.js";


const userRouter = express.Router();
// register
userRouter.post("/register", registerUser);

// login
userRouter.post("/login", loginUser);

userRouter.get("/cart", protect, getCart);
userRouter.post("/cart/add", protect, addToCart);
userRouter.delete("/cart/remove", protect, removeFromCart);

export default userRouter;