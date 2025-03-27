const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const complaintRoutes = require('./routes/Routes');
const cors = require('cors');
const app = express();
const cron = require('node-cron');
const Slot = require('./models/Slot'); // Importing the Slot model
const cookieParser = require('cookie-parser');


app.use(cookieParser()); // This will parse cookies and populate req.cookies

// Your routes and middleware
// Configure CORS (Choose ONE of these options)

// Option 1:  Allow all origins (NOT recommended for production)
// app.use(cors());

// Option 2:  Restrict to your frontend origin (Recommended for production)


app.use(cors({
  origin: ["http://localhost:5173", "https://cauverytest.netlify.app","https://cauveryhostel.in","http://cauveryhostel.in","www.cauveryhostel.in"], // Add localhost for development
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
app.get('/',(req,res)=>res.send("API IS WORKING"))
// Connect to MongoDB

// Function to reset Slots collection at 12:00 AM
const resetSlotsCollection = async () => {
  try {
    await Slot.deleteMany({}); // Delete all documents
    console.log('✅ Slots collection reset successfully at 12:00 AM.');
  } catch (error) {
    console.error('❌ Error resetting Slots collection:', error);
  }
};

// Schedule the reset task to run **every day at 12:00 AM**
cron.schedule('0 0 * * *', () => {
  console.log('🕛 Running scheduled task to reset Slots collection...');
  resetSlotsCollection();
});




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
