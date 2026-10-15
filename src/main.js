import express from "express";
import {authRouter, userRouter} from "./modules/index.js";
import {port} from "../config/config.js";
import dbConnection from "./DB/connection.js";
const app = express();

app.use(express.json());

//await connection();
//app.get("/", (req, res) => {
  //  return res.json({message: "application is running"});
//});
dbConnection();

app.use("/users", userRouter);
app.use("/auth",authRouter);


app.all("/{*dummy}", (req, res) => {
   return res.status(404).json({message: "In-valid routing"});
});

app.use((error, req, res, next) => {
    const status = error?.cause?.status || 500;

    return res.status(status).json({
        error,
        message: error?.message || "Internal server error",
        stack: error.stack,
    });
});

app.listen(port, () => {
    console.log("Server is running on port:", port);
});