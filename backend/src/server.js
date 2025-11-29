import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;
const app = express();

app.get("/" , (req , res) => {
    res.send("Hello World");
});
app.get("/auth/login" , (req , res) => {
    res.send("Login Success");
});
app.get("/auth/logout" , (req , res) => {
    res.send("Logout Success");
});
app.get("/auth/sign-in" , (req , res) => {
    res.send("Sign in Success");
});

app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`);
});
