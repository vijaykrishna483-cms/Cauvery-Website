const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const complaintRoutes = require('./routes/Routes');
const cors = require('cors');
const app = express();

// Configure CORS (Choose ONE of these options)

// Option 1:  Allow all origins (NOT recommended for production)
// app.use(cors());

// Option 2:  Restrict to your frontend origin (Recommended for production)

app.use(cors({
    origin: ["http://localhost:5173", "https://cauverytest.netlify.app"], // Add localhost for development
    credentials: true
}));


// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api', complaintRoutes);

// Connect to MongoDB


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process on connection error
  });
