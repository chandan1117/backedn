const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS enable
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Atlas Connected");
})
.catch((err) => {
    console.log("Connection Error:", err);
});


// Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", userSchema);


// Save API
app.post("/save", async (req,res)=>{
    try{

        const {name,email} = req.body;

        const user = new User({
            name,
            email
        });

        await user.save();

        res.send("Data Saved Successfully");

    }catch(err){
        res.send(err);
    }
});

// GET API - Fetch All Users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Test Route
app.get("/", (req, res) => {
    res.send("API Running chclclclclc");
});
app.get("/users", (req, res) => {
    res.send("API Rsdlfljunning");
});


// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});