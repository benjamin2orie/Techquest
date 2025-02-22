
import mongoose from  'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  passportPhoto: {
    type: String,
    required: true
  },
  course:{
    type: String,
    required:true,
    default: null
  },
  paid:{
    required: true,
    type: Boolean,
  },
  paymentReceipt: {
    type: String,
    required: [true, "payment receipt is required"]
  },
  paymentType:{
    type:String,
    required:true,
    default:null
  },
  feedBack:{
    type:String,
    required: true
  },
  sendEmailCopy: {
    type: Boolean,
    default: false
  }
}, {timestamps:true});



const User = mongoose.model("User", UserSchema);

export default User;

