import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Newsroom from "./pages/Newsroom";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

// Protected Route Component for Students
function StudentRoute({ children }) {
  const authData = JSON.parse(localStorage.getItem("authData") || "{}");
  
  if (!authData.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (authData.role !== "student") {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
}

// Protected Route Component for Admin
function AdminRoute({ children }) {
  const authData = JSON.parse(localStorage.getItem("authData") || "{}");
  
  if (!authData.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (authData.role !== "admin") {
    return <Navigate to="/home" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Student Protected Routes */}
        <Route 
          path="/home" 
          element={
            <StudentRoute>
              <Home />
            </StudentRoute>
          } 
        />
        <Route 
          path="/newsroom" 
          element={
            <StudentRoute>
              <Newsroom />
            </StudentRoute>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <StudentRoute>
              <Notifications />
            </StudentRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <StudentRoute>
              <Profile />
            </StudentRoute>
          } 
        />
        
        {/* Admin Protected Routes */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App
