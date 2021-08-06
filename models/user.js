import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
