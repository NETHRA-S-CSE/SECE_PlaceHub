import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Reports() {
  const [stats, setStats] = useState({
    totalRegistered: 0,
    yearWise: {
      "1st Year": 0,
      "2nd Year": 0,
      "3rd Year": 0,
      "4th Year": 0
    },
    placed: 0,
    notPlaced: 0,
    placementRate: 0
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    // Get registered users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Get all student profiles (those who completed profile)
    const allProfiles = [];
    registeredUsers.forEach(user => {
      const profileKey = `studentProfile_${user.username}`;
      const profile = localStorage.getItem(profileKey);
      if (profile) {
        allProfiles.push(JSON.parse(profile));
      }
    });

    // Calculate year-wise distribution
    const yearWise = {
      "1st Year": 0,
      "2nd Year": 0,
      "3rd Year": 0,
      "4th Year": 0
    };

    allProfiles.forEach(profile => {
      if (profile.year) {
        yearWise[profile.year] = (yearWise[profile.year] || 0) + 1;
      }
    });

    // Calculate placed vs not placed
    // For demo purposes, we'll consider students who have applied to drives as "placed"
    const appliedDrivesRecords = [];
    registeredUsers.forEach(user => {
      const appliedKey = `appliedDrives_${user.username}`;
      const applied = JSON.parse(localStorage.getItem(appliedKey) || "[]");
      if (applied.length > 0) {
        appliedDrivesRecords.push(user.username);
      }
    });

    const placed = appliedDrivesRecords.length;
    const notPlaced = allProfiles.length - placed;
    const placementRate = allProfiles.length > 0 
      ? ((placed / allProfiles.length) * 100).toFixed(1) 
      : 0;

    setStats({
      totalRegistered: registeredUsers.length,
      yearWise,
      placed,
      notPlaced,
      placementRate
    });
  };

  return (
    <>
      <Header />
      <main style={{
        maxWidth: "1200px",
        margin: "30px auto",
        padding: "20px"
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "30px",
          fontSize: "32px"
        }}>📊 Placement Reports & Analytics</h2>

        {/* Overview Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}>
          {/* Total Registered */}
          <div style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", fontWeight: "bold" }}>
              {stats.totalRegistered}
            </div>
            <div style={{ fontSize: "18px", marginTop: "10px" }}>
              Total Registered Students
            </div>
          </div>

          {/* Placed */}
          <div style={{
            backgroundColor: "#2196F3",
            color: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", fontWeight: "bold" }}>
              {stats.placed}
            </div>
            <div style={{ fontSize: "18px", marginTop: "10px" }}>
              Students Applied to Drives
            </div>
          </div>

          {/* Not Placed */}
          <div style={{
            backgroundColor: "#FF9800",
            color: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", fontWeight: "bold" }}>
              {stats.notPlaced}
            </div>
            <div style={{ fontSize: "18px", marginTop: "10px" }}>
              Students Not Applied
            </div>
          </div>

          {/* Placement Rate */}
          <div style={{
            backgroundColor: "#9C27B0",
            color: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", fontWeight: "bold" }}>
              {stats.placementRate}%
            </div>
            <div style={{ fontSize: "18px", marginTop: "10px" }}>
              Application Rate
            </div>
          </div>
        </div>

        {/* Year-wise Distribution */}
        <div style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{
            color: "#333",
            marginBottom: "25px",
            fontSize: "24px",
            borderBottom: "3px solid #2196F3",
            paddingBottom: "10px"
          }}>📚 Year-wise Student Distribution</h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px"
          }}>
            {Object.entries(stats.yearWise).map(([year, count]) => (
              <div key={year} style={{
                backgroundColor: "#f8f9fa",
                padding: "25px",
                borderRadius: "8px",
                border: "2px solid #e0e0e0",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "#2196F3",
                  marginBottom: "10px"
                }}>
                  {count}
                </div>
                <div style={{
                  fontSize: "16px",
                  color: "#666",
                  fontWeight: "500"
                }}>
                  {year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div style={{
          backgroundColor: "#e3f2fd",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "30px",
          border: "1px solid #90caf9"
        }}>
          <p style={{ margin: "0", color: "#1565c0", fontSize: "14px" }}>
            <strong>ℹ️ Note:</strong> Statistics are calculated based on registered students and their profile completion status. 
            "Applied to Drives" indicates students who have applied to at least one placement drive.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Reports;
