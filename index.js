import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import FileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log ('connected');
} catch (error) {
    console.error(error);
}
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(router);
app.use(ProductRoute);
app.use(express.static("public"));

app.listen(5000, ()=> 
    console.log('server running at port 5000'));
