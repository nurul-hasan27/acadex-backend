import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT =  process.env.PORT || 3000;
const app = express();

app.get("/",(req,res)=>{
    res.json({
        message: "App is running on the docker",
    });
    console.log("hello world");
});

app.listen(PORT, ()=>{
    console.log(`App is running on the port ${PORT}`);
})