import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      first_name: {
        type:String,
        trim: true,
      },
      last_name: {
        type:String,
        trim: true,
      },
      additional_name: {
        type:String,
        trim: true,
      },
      email: {
        type:String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      
      company_name:{
        type:String,
      },
      job_position:{
        type:String
      },
      school:{
        type:String
      },
      indrustry:{
        type:String
      },
      country:{
        type:String,
      },
      city:{
        type:String,
      },
      contactinfo:{
        type:String,
      },
    },
    { timestamps: true }
  );


export default mongoose.model('users', userSchema)