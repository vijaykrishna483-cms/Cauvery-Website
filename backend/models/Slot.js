const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
  {
    gameName: {
      type: String,
      required: true,
      enum: ['Jenga', 'Othello', 'Risk', 'Monopoly'], // List of games
    },
    starttime: {
      type: String,
      required: true,
    },
    endtime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically tracks createdAt and updatedAt fields
  }
);

// Compound index to prevent duplicate game slots
slotSchema.index({ gameName: 1, starttime: 1, endtime: 1 }, { unique: true });



const slotModel= mongoose.model('Slots', slotSchema);
module.exports =slotModel