const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Full name is required"], trim: true, minlength: 2 },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
