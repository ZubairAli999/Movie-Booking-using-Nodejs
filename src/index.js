const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const movieRoutes = require("./router/movie-router");
const theatreRoutes = require("./router/threatre-router");
const authRoutes = require("./router/auth-router");
const userRoutes = require("./router/user-router");
const bookingRoutes = require("./router/booking-router");
const showRoutes = require("./router/show-router");
const paymentRoutes =require("./router/payment-router")

const PORT = process.env.PORT || 5000;
const app = express();
// Config
dotenv.config();

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Movie Booking API Running Successfully",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/theatres", theatreRoutes);
app.use("/api/v1/shows", showRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payment", paymentRoutes);


// 404 Route Handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
