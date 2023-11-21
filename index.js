const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Mongo_apiKey = process.env.MONGODB_KEY;
const uri = `mongodb+srv://${Mongo_apiKey}.94i7emo.mongodb.net/?retryWrites=true&w=majority`;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser"); // Import body-parser 
const cors = require("cors");
const axios = require("axios");
const driverRoutes = require("./routes/driverRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const nala_authRoutes = require("./routes/nala/authRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/nala/uploadRoutes");
const nala_userRoutes = require("./routes/nala/userRoutes");
const nala_steamRoutes = require("./routes/nala/steam/participants");
const paymentRoutes = require("./routes/paymentRoutes");
const CompleteProfileRoutes = require("./routes/nala/completeProfileRoutes");

// Use body-parser middleware to parse request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all routes
app.use(cors());

// Use the driver routes as middleware
app.use("/drivers", driverRoutes);

// Use the user/nala routes as middleware
app.use("/nala", uploadRoutes);

// 
// Use the CompleteProfile
app.use("/nala", CompleteProfileRoutes);

// Use the post routes as middleware
app.use("/posts", postRoutes);

// Use the Steam routes as middleware
app.use("/nala/steam", nala_steamRoutes);

+(
  // Use the authentication routes as middleware
  app.use("/auth", authRoutes)
);

+(
  // Use the Nala authentication routes as middleware
  app.use("/nala/auth", nala_authRoutes)
);

// Use the user routes as middleware
app.use("/users", userRoutes);

// Use the user routes as middleware
app.use("/nala/users", nala_userRoutes);

// Braintree payment routes
app.use("/payment", paymentRoutes);

// Start the server and connect to the database
const PORT = process.env.PORT || 8000;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Database Connection succeeded");
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });