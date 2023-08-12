import express from "express";
import colors from "colors";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js";
import categoryRoutes from "./Routes/categoryRoutes.js"
import productsRoutes from './Routes/productsRoutes.js'
import cors from "cors"

//config env 
dotenv.config();
//REST object
const app = express();

//connect db config
connectDB();
//middleware
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth/",authRoute)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productsRoutes)
//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce site</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//listening
app.listen(PORT, () => {
    console.log(`your application is running on ${PORT}`.bgCyan.white);
})