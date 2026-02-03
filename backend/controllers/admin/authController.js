const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // For sending emails
const dotenv = require('dotenv'); // To load environment variables

dotenv.config(); // Load environment variables from .env file

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g., 'smtp.gmail.com'
  port: process.env.EMAIL_PORT, // e.g., 587
  secure: process.env.EMAIL_SECURE === 'true', // Use 'true' if port 465, 'false' if 587 or 25
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// --- Existing loginAdmin function ---
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    // TEMPORARY: Create a default admin if the database is empty and these credentials are used.
    // REMOVE THIS BLOCK IN PRODUCTION after your first admin is securely created.
    if (!admin && email === "admin@example.com" && password === "adminpassword") {
      const hashedPassword = await bcrypt.hash("adminpassword", 12);
      admin = await Admin.create({ email: "admin@example.com", password: hashedPassword });
      console.log("Default admin 'admin@example.com' created for demonstration.");
      // Now, try to log in with the newly created admin
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials (after temp creation)" });
      }
    } else if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

// --- New Forgot Password Controller Functions ---

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    // It's a good security practice not to reveal if an email exists in the system.
    // Always send a generic success message if the request seems valid.
    if (!admin) {
      return res.status(200).json({ message: "If an account with that email exists, a password reset code has been sent." });
    }

    // Generate a random 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpires = Date.now() + 3600000; // Code valid for 1 hour (3600000 ms)

    admin.resetPasswordToken = resetCode;
    admin.resetPasswordExpires = resetExpires;
    await admin.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: "Password Reset Code for Admin Panel",
      html: `
        <p>You are receiving this because you (or someone else) has requested the reset of the password for your admin account.</p>
        <p>Your password reset code is: <strong>${resetCode}</strong></p>
        <p>This code is valid for 1 hour. If you did not request this, please ignore this email.</p>
        <p>If you are having trouble resetting your password, please contact support.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset code sent to your email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Error sending password reset code. Please check server logs." });
  }
};

exports.verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const admin = await Admin.findOne({
      email,
      resetPasswordToken: code,
      resetPasswordExpires: { $gt: Date.now() }, // Check if the token is not expired
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired reset code." });
    }

    res.status(200).json({ message: "Code verified successfully. You can now reset your password." });
  } catch (error) {
    console.error("Verify reset code error:", error);
    res.status(500).json({ message: "Error verifying reset code. Please try again." });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({
      email,
      resetPasswordToken: code,
      resetPasswordExpires: { $gt: Date.now() }, // Re-verify the token is still valid
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired reset code. Please request a new one." });
    }

    // Update the password - the pre-save hook in the Admin model will handle hashing
    admin.password = newPassword;
    admin.resetPasswordToken = undefined; // Clear the token
    admin.resetPasswordExpires = undefined; // Clear the expiration
    await admin.save();

    res.status(200).json({ message: "Password has been reset successfully. You can now log in with your new password." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Error resetting password. Please try again." });
  }
};