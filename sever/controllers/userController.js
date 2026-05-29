import jwt from "jsonwebtoken";
import User from "../models/users.js";
import bcrypt from "bcryptjs";

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check email
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // create token
    const token = jwt.sign(
      {
        id: user._id,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login success",
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getCart = async (req, res) => {

  const user = await User.findById(
    req.user.id
  ).populate("cart.product");

  res.json(user.cart);
};

const addToCart = async (req, res) => {

  try {

    const { productId } = req.body;

    const user = await User.findById(
      req.user.id
    );

    // check product already in cart
    const existingProduct = user.cart.find(
      (item) =>
        item.product.toString() === productId
    );

    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      user.cart.push({
        product: productId,
        quantity: 1,
      });

    }

    await user.save();

    res.json({
      message: "Add to cart success",
      cart: user.cart,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const removeFromCart = async (req, res) => {

  try {

    const { productId } = req.body;

    const user = await User.findById(
      req.user.id
    );

   const cartItem = user.cart.find(
      (item) =>
        item.product.toString() === productId
    );

    if (!cartItem) {

      return res.status(404).json({
        message: "Product not found in cart",
      });

    }

    // decrease quantity
    if (cartItem.quantity > 1) {

      cartItem.quantity -= 1;

    } else {

      // remove product
      user.cart = user.cart.filter(
        (item) =>
          item.product.toString() !== productId
      );

    }

    await user.save();

    res.json({
      message: "Cart updated",
      cart: user.cart,
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export  {
  registerUser,
  loginUser,
  getCart,
  addToCart,
  removeFromCart,
};