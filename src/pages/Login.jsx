import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Predefined credentials (In production, this should be handled by backend)
  const credentials = {
    student: {
      username: "student",
      password: "student123"
    },
    admin: {
      username: "admin",
      password: "admin123"
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate credentials
    if (username === credentials[role].username && password === credentials[role].password) {
      // Store authentication data
      const authData = {
        isAuthenticated: true,
        role: role,
        username: username,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem("authData", JSON.stringify(authData));

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div>
      <Header />
      <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>PlaceHub Login</h1>
        
        {/* Role Selection */}
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "15px", color: "#333" }}>Select Your Role</h3>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "15px 25px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              backgroundColor: role === "student" ? "#007bff" : "#fff",
              color: role === "student" ? "#fff" : "#333",
              transition: "all 0.3s ease",
              fontWeight: "500"
            }}>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
                style={{ marginRight: "8px" }}
              />
              🎓 Student
            </label>
            <label style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "15px 25px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              backgroundColor: role === "admin" ? "#007bff" : "#fff",
              color: role === "admin" ? "#fff" : "#333",
              transition: "all 0.3s ease",
              fontWeight: "500"
            }}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
                style={{ marginRight: "8px" }}
              />
              👔 Placement Officer
            </label>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{
          padding: "30px",
          border: "2px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#f8f9fa"
        }}>
          <h3 style={{ marginBottom: "20px", textAlign: "center", color: "#495057" }}>
            {role === "student" ? "Student Login" : "Placement Officer Login"}
          </h3>

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

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "600", fontSize: "16px", display: "block", marginBottom: "8px" }}>
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                fontSize: "16px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                transition: "border-color 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "#007bff"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: "600", fontSize: "16px", display: "block", marginBottom: "8px" }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                fontSize: "16px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                transition: "border-color 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "#007bff"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "18px",
              fontWeight: "600",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(0, 123, 255, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#0056b3";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 12px rgba(0, 123, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#007bff";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 123, 255, 0.3)";
            }}
          >
            Login
          </button>
        </form>

        {/* Demo Credentials Info */}
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#e7f3ff",
          border: "1px solid #b3d7ff",
          borderRadius: "8px",
          fontSize: "14px"
        }}>
          <strong>Demo Credentials:</strong>
          <div style={{ marginTop: "10px" }}>
            <div><strong>Student:</strong> username: <code>student</code> | password: <code>student123</code></div>
            <div style={{ marginTop: "5px" }}><strong>Admin:</strong> username: <code>admin</code> | password: <code>admin123</code></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;