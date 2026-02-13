import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    registerNumber: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    if (!/^\d{12}$/.test(formData.registerNumber)) {
      setError("Register number must be exactly 12 digits!");
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const userExists = existingUsers.some(user => 
      user.username === formData.username || user.registerNumber === formData.registerNumber
    );

    if (userExists) {
      setError("Username or Register Number already exists!");
      return;
    }

    // Save user
    const newUser = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      registerNumber: formData.registerNumber,
      registeredAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Student Registration</h1>
        
        <form onSubmit={handleSubmit} style={{
          padding: "30px",
          border: "2px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#f8f9fa"
        }}>
          {error && (
            <div style={{
              padding: "12px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              borderRadius: "5px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div style={{
              padding: "12px",
              backgroundColor: "#d4edda",
              color: "#155724",
              border: "1px solid #c3e6cb",
              borderRadius: "5px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              ✓ {success}
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600", fontSize: "16px", display: "block", marginBottom: "8px" }}>
              Username:
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                fontSize: "16px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                outline: "none"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600", fontSize: "16px", display: "block", marginBottom: "8px" }}>
              Email:
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                fontSize: "16px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                outline: "none"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600", fontSize: "16px", display: "block", marginBottom: "8px" }}>
              Register Number (12 digits):
            </label>
            <input
              type="text"
              maxLength="12"
              value={formData.registerNumber}
              onChange={(e) => setFormData({...formData, registerNumber: e.target.value})}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                fontSize: "16px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                outline: "none"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600", fontSize: "16px", display: "block", marginBottom: "8px" }}>
              Password:
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                fontSize: "16px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                outline: "none"
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: "600", fontSize: "16px", display: "block", marginBottom: "8px" }}>
              Confirm Password:
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                fontSize: "16px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                outline: "none"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "18px",
              fontWeight: "600",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "15px"
            }}
          >
            Register
          </button>

          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
