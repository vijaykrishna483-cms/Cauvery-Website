const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
  {
    gameName: {
      type: String,
      required: true,
      enum: ['Genga', 'Othello', 'Risk', 'Monopoly'], // List of games
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
    timestamps: true, // Tracks createdAt and updatedAt fields automatically
  }
);

// Adding a compound index that includes gameName, starttime, and endtime
slotSchema.index({ gameName: 1, starttime: 1, endtime: 1 }, { unique: true });

module.exports = mongoose.model('Slots', slotSchema);
