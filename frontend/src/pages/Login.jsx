import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <>
      <Navbar />

      {/* Login Section */}
      <section className="py-5 bg-light" style={{ minHeight: "80vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 col-lg-4">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <h3 className="text-center fw-bold mb-4">
                    Admin Login
                  </h3>

                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="admin@greenplant.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button className="btn btn-success w-100 mt-2">
                      Login
                    </button>
                  </form>

                  <p className="text-muted text-center small mt-3 mb-0">
                    Authorized personnel only
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

export default Login;
