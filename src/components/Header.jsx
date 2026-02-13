import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("authData");
        if (stored) {
            setAuthData(JSON.parse(stored));
        }
    }, [location]);

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            localStorage.removeItem("authData");
            setAuthData(null);
            navigate("/", { replace: true });
            window.location.reload();
        }
    };

    // Don't show nav on login page
    const isLoginPage = location.pathname === "/";

    return (
        <>
            <header>
                <div style={{ textAlign: "center" }}>
                    <h1>SECE PlaceHub</h1>
                    <p>A Smart Placement Management & Analytics System</p>
                </div>
                {authData && !isLoginPage && (
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "center",
                        alignItems: "center", 
                        gap: "15px",
                        marginTop: "15px"
                    }}>
                        <div style={{
                            display: "flex", 
                            alignItems: "center", 
                            gap: "15px",
                            padding: "10px 20px",
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            borderRadius: "8px",
                            border: "1px solid rgba(255, 255, 255, 0.3)"
                        }}>
                            <span style={{ fontWeight: "500", color: "#fff" }}>
                                {authData.role === "admin" ? "👔 " : "🎓 "}
                                {authData.role === "admin" ? "Placement Officer" : "Student"}
                            </span>
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease"
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = "#c82333"}
                                onMouseLeave={(e) => e.target.style.backgroundColor = "#dc3545"}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {!isLoginPage && authData && (
                <nav>
                    {authData.role === "student" ? (
                        <>
                            <Link to="/home">Home</Link>
                            <Link to="/newsroom">NewsRoom</Link>
                            <Link to="/notifications">Notifications</Link>
                            <Link to="/profile">Profile</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/admin">Dashboard</Link>
                            <Link to="/reports">Reports</Link>
                        </>
                    )}
                </nav>
            )}
        </>
    );
}

export default Header;