const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    RoomNO: {
        type: Number,
        required: true
    },
    RollNO: {
        type: String,
        required: true
    },
    ContactNo: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Validates for exactly 10 digits
    },
    Complaint: {
        type: String,
        required: true
    },
    resolved: { 
        type: Boolean, 
        default: false  // Initially unchecked (false)
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
