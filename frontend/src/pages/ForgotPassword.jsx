import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter Code, 3: Set New Password
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordRequest = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const { data } = await axios.post("/api/admin/forgot-password", { email });
      setMessage(data.message);
      setStep(2); // Move to code verification step
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const { data } = await axios.post("/api/admin/verify-reset-code", { email, code });
      setMessage(data.message);
      setStep(3); // Move to password reset step
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired code. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (newPassword.length < 6) { // Basic password length validation
      return setError("Password must be at least 6 characters long.");
    }

    try {
      const { data } = await axios.post("/api/admin/reset-password", {
        email,
        code,
        newPassword,
      });
      setMessage(data.message + " Redirecting to login...");
      setTimeout(() => {
        navigate("/admin/login"); // Redirect to login page after successful reset
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light" style={{ minHeight: "80vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 col-lg-4">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <h3 className="text-center fw-bold mb-4">
                    Forgot Password
                  </h3>

                  {message && <div className="alert alert-success">{message}</div>}
                  {error && <div className="alert alert-danger">{error}</div>}

                  {step === 1 && (
                    <form onSubmit={handleForgotPasswordRequest}>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="admin@greenplant.com"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          value={email}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary w-100 mt-2">
                        Send Reset Code
                      </button>
                    </form>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleVerifyCode}>
                      <p className="text-center text-muted small">
                        A verification code has been sent to {email}.
                      </p>
                      <div className="mb-3">
                        <label className="form-label">Verification Code</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 6-digit code"
                          onChange={(e) => setCode(e.target.value)}
                          required
                          value={code}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary w-100 mt-2">
                        Verify Code
                      </button>
                      <button
                        type="button"
                        className="btn btn-link w-100 mt-2"
                        onClick={() => { setStep(1); setMessage(""); setError(""); setCode(""); }} // Allow user to go back
                      >
                        Resend Code / Change Email
                      </button>
                    </form>
                  )}

                  {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                      <p className="text-center text-muted small">
                        Code verified. Please set your new password.
                      </p>
                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="••••••••"
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          value={newPassword}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="••••••••"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          value={confirmPassword}
                        />
                      </div>
                      <button type="submit" className="btn btn-success w-100 mt-2">
                        Reset Password
                      </button>
                    </form>
                  )}

                  <p className="text-muted text-center small mt-3 mb-0">
                    <button
                      className="btn btn-link btn-sm"
                      onClick={() => navigate("/admin/login")}
                    >
                      Back to Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ForgotPassword;