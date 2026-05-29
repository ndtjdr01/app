import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
        cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    },
 { timestamps: true });

const User = mongoose.model('users', usersSchema);
export default User;