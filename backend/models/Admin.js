const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Pre-save hook to hash password before saving (if it's new or modified)
// Modified to use async/await without explicitly calling 'next()'.
// Mongoose will wait for this async function to resolve.
adminSchema.pre('save', async function () { // Removed 'next' from function arguments
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return; // If password hasn't changed, simply return. Mongoose will proceed.
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  // No explicit next() call is needed here for async hooks.
  // The completion of this async function tells Mongoose to proceed.
});

module.exports = mongoose.model("Admin", adminSchema);