import { Schema , model } from "mongoose";

const passengerSchema = new Schema({
  PassengerName: {
    type:String , 
    required: true
  } , 
  FlightNumber: {
    type:Number,
    required:true
  } , 
  destination:{
    type:String , 
    required:true
  } , 
  seatNumber:{
    type:Number,
    required:true
  } , 
  luggageWeight:{
    type:Number , 
  }
});

const Passenger = model("Passenger" , passengerSchema);