const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const moviesRoutes = require("../api/routes/movie");
const directorRoutes = require("../api/routes/director");

// middleware
// logging
app.use(morgan("dev"));
// parsing
app.use(express.urlencoded({ 
        extended: true 
}));
// parsing JSON requests
app.use(express.json());
// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow_Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-All_Methods", "GET, POST, PUT, PATCH, DELETE");
    }
    next();
});

// GET request for checking if the server is running
app.get("/", (req, res, next) => {
    req.status(201).json ({
        message: "Server is up!",
        method: req.method
    });
});

// routes
app.use("/movie", moviesRoutes);
app.use("/director", directorRoutes);

// error handling middleware
app.use((req, res, next) => {
    const error = new Error("NOT FOUND!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

// connect to mongoDB
mongoose.connect(process.env.mongoDBURL, (err) => {
    if(err){
        console.log("Error: ", err.message);
    }
    else{
        console.log("MongoDB connection was successful");
    }
});



module.exports = app;