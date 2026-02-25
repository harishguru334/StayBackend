const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  // Guest Details
  title: { type: String, default: 'Mr' },
  guestName: { type: String, required: true },
  mobile: { type: String },
  email: { type: String },
  arrDate: { type: Date },
  depDate: { type: Date },
  noOfRoom: { type: Number, default: 1 },
  noOfNight: { type: Number, default: 1 },
  paxType: { type: String, default: 'Male' },
  deal: { type: String },
  masterRoom: { type: String, default: '103' },
  plan: { type: String, default: 'AMERICAN PLAN' },
  wifiUser: { type: String },
  wifiPass: { type: String },
  idType: { type: String },
  idNumber: { type: String },
  company: { type: String },
  
  // Photos
  guestPhotos: [{ type: String }], // Array of file paths
  extraPersons: [{ type: String }], // Array of file paths
  
  // GST
  isGST: { type: Boolean, default: false },
  gstNumber: { type: String },
  
  // Posting/Billing
  baseTariff: { type: Number, default: 2000 },
  extraPersonCharge: { type: Number, default: 500 },
  extraPersonCount: { type: Number, default: 0 },
  otherCharges: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  subtotal: { type: Number },
  gstAmount: { type: Number },
  total: { type: Number },
  
  // Status
  status: { type: String, default: 'Active' }, // e.g., Active, CheckedOut
}, { timestamps: true });

module.exports = mongoose.model('CheckIn', checkInSchema);