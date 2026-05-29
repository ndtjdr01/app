import dotenv from 'dotenv'
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import Product from './models/products.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoute.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {console.log('Connected to MongoDB');console.log(mongoose.connection.name);})
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    res.send("API is running...");
})


app.use('/api/products', productRouter);
app.use('/api/users', userRouter);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});