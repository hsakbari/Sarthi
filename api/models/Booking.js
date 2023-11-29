const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  arrival: {type:Date, required:true},
  departure: {type:Date, required:true},
  name: {type:String, required:true},
  mobile: {type:String, required:true},
  price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;