import express from "express";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
const app = express();
import dotenv from 'dotenv';
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);


app.listen(8000,()=>{
    console.log("server started test");
})