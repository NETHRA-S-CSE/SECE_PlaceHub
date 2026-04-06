import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Notifications() {
  const [eligibleDrives, setEligibleDrives] = useState([]);
  const [appliedDrives, setAppliedDrives] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [driveNotifications, setDriveNotifications] = useState([]);

  useEffect(() => {
    // Load student profile
    const profile = JSON.parse(localStorage.getItem("studentProfile") || "null");
    setStudentProfile(profile);

    // Load all placement drives
    const drives = JSON.parse(localStorage.getItem("placementDrives") || "[]");
    
    // Load applied drives
    const applied = JSON.parse(localStorage.getItem("appliedDrives") || "[]");
    setAppliedDrives(applied);

    // Load drive-specific notifications
    const allNotifications = JSON.parse(localStorage.getItem("driveNotifications") || "[]");
    
    // Filter notifications for drives the student has applied to
    const relevantNotifications = allNotifications.filter(notification => 
      applied.includes(notification.driveId)
    ).sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    
    setDriveNotifications(relevantNotifications);

    if (profile) {
      // Filter drives based on eligibility
      const eligible = drives.filter(drive => {
        const yearMatch = drive.eligibleYears.includes(profile.year);
        const deptMatch = drive.eligibleDepartments.includes(profile.department);
        const cgpaMatch = parseFloat(profile.cgpa) >= parseFloat(drive.minCGPA);
        
        return yearMatch && deptMatch && cgpaMatch;
      });

      setEligibleDrives(eligible);
    }
  }, []);

  const handleApply = (drive) => {
    if (!studentProfile) {
      alert("Please complete your profile first!");
      return;
    }

    // Check if already applied
    if (appliedDrives.includes(drive.id)) {
      alert("You have already applied for this drive!");
      return;
    }

    // Confirm application
    const confirmed = window.confirm(
      `Have you completed the application on the external portal?\n\nDrive: ${drive.title}\n\nClick OK only after you have applied through the registration link.`
    );

    if (confirmed) {
      // Record application
      const application = {
        driveId: drive.id,
        driveTitle: drive.title,
        studentData: studentProfile,
        appliedDate: new Date().toISOString()
      };

      // Store in drive-specific applications
      const existingApplications = JSON.parse(localStorage.getItem("driveApplications") || "[]");
      existingApplications.push(application);
      localStorage.setItem("driveApplications", JSON.stringify(existingApplications));

      // Mark as applied
      const newAppliedDrives = [...appliedDrives, drive.id];
      setAppliedDrives(newAppliedDrives);
      localStorage.setItem("appliedDrives", JSON.stringify(newAppliedDrives));

      alert(`Application recorded for "${drive.title}"!\n\nYour application has been submitted to the Placement Office.`);
    }
  };

  return (
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        <h1>🔔 My Notifications</h1>
        <p style={{ fontSize: "16px", marginBottom: "20px" }}>
          Placement and internship opportunities matching your profile
        </p>

        {/* Drive-Specific Notifications Section */}
        {driveNotifications.length > 0 && (
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ 
              color: "#0056b3", 
              fontSize: "22px",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              📢 Updates for Your Applied Drives
            </h2>
            
            {driveNotifications.map((notification) => (
              <div 
                key={notification.id}
                className="card" 
                style={{ 
                  marginBottom: "15px",
                  borderLeft: "5px solid #ffc107",
                  backgroundColor: "#fff9e6",
                  animation: "fadeIn 0.5s ease"
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "10px"
                }}>
                  <h3 style={{ 
                    margin: 0, 
                    color: "#856404",
                    fontSize: "18px",
                    fontWeight: "700"
                  }}>
                    {notification.driveTitle}
                  </h3>
                  <span style={{
                    padding: "4px 10px",
                    backgroundColor: "#ffc107",
                    color: "#000",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    NEW
                  </span>
                </div>

                <p style={{ 
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "#495057",
                  marginBottom: "10px",
                  whiteSpace: "pre-wrap"
                }}>
                  {notification.message}
                </p>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "10px",
                  borderTop: "1px solid #ffeaa7",
                  fontSize: "13px",
                  color: "#856404"
                }}>
                  <span>
                    📅 {new Date(notification.postedDate).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span style={{ fontWeight: "600" }}>
                    From: Placement Office
                  </span>
                </div>
              </div>
            ))}

            <hr style={{ 
              margin: "30px 0",
              border: "none",
              borderTop: "2px solid #dee2e6"
            }} />
          </div>
        )}

        {/* Eligible Drives Section */}
        <h2 style={{ 
          color: "#0056b3", 
          fontSize: "22px",
          marginBottom: "15px"
        }}>
          🎯 Available Opportunities
        </h2>

        {!studentProfile ? (
          <div className="card" style={{ 
            textAlign: "center", 
            padding: "40px", 
            backgroundColor: "#fff3cd",
            border: "2px solid #ffc107"
          }}>
            <h3 style={{ color: "#856404" }}>⚠️ Profile Not Complete</h3>
            <p style={{ color: "#856404" }}>
              Please complete your profile to view eligible placement opportunities.
            </p>
            <a href="/profile" style={{
              display: "inline-block",
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "500"
            }}>
              Complete Profile
            </a>
          </div>
        ) : eligibleDrives.length === 0 ? (
          <div className="card" style={{ 
            textAlign: "center", 
            padding: "40px",
            backgroundColor: "#e7f3ff",
            border: "2px solid #b3d7ff"
          }}>
            <h3 style={{ color: "#0056b3" }}>📭 No New Opportunities</h3>
            <p style={{ color: "#495057" }}>
              There are currently no placement drives matching your profile.
            </p>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
              Your Profile: {studentProfile.year} Year | {studentProfile.department} | CGPA: {studentProfile.cgpa}
            </p>
          </div>
        ) : (
          <>
            <div style={{
              padding: "15px",
              backgroundColor: "#d4edda",
              border: "1px solid #c3e6cb",
              borderRadius: "8px",
              marginBottom: "20px"
            }}>
              <strong>✓ You are eligible for {eligibleDrives.length} placement {eligibleDrives.length === 1 ? 'drive' : 'drives'}</strong>
              <p style={{ fontSize: "14px", marginTop: "5px", marginBottom: 0 }}>
                Your Profile: {studentProfile.year} Year | {studentProfile.department} | CGPA: {studentProfile.cgpa}
              </p>
            </div>

            {eligibleDrives.map((drive) => (
              <div className="card" key={drive.id} style={{ marginBottom: "20px" }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  marginBottom: "10px"
                }}>
                  <h3 style={{ margin: 0, color: "#333" }}>{drive.title}</h3>
                  {appliedDrives.includes(drive.id) && (
                    <span style={{
                      padding: "5px 12px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      borderRadius: "5px",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}>
                      ✓ Applied
                    </span>
                  )}
                </div>
                
                <p style={{ marginBottom: "10px" }}>{drive.description}</p>
                
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                  gap: "10px",
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  marginBottom: "15px"
                }}>
                  <div>
                    <strong style={{ color: "#495057" }}>📅 Deadline:</strong>
                    <p style={{ margin: "5px 0 0 0" }}>{new Date(drive.deadline).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <strong style={{ color: "#495057" }}>🎓 Eligible Years:</strong>
                    <p style={{ margin: "5px 0 0 0" }}>{drive.eligibleYears.join(", ")}</p>
                  </div>
                  <div>
                    <strong style={{ color: "#495057" }}>🏛️ Departments:</strong>
                    <p style={{ margin: "5px 0 0 0" }}>{drive.eligibleDepartments.join(", ")}</p>
                  </div>
                  <div>
                    <strong style={{ color: "#495057" }}>📊 Min CGPA:</strong>
                    <p style={{ margin: "5px 0 0 0" }}>{drive.minCGPA}</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a 
                    href={drive.registrationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "5px",
                      fontWeight: "500"
                    }}
                  >
                    📝 Apply on Portal
                  </a>
                  
                  <button
                    onClick={() => handleApply(drive)}
                    disabled={appliedDrives.includes(drive.id)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: appliedDrives.includes(drive.id) ? "#6c757d" : "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      fontWeight: "500",
                      cursor: appliedDrives.includes(drive.id) ? "not-allowed" : "pointer",
                      opacity: appliedDrives.includes(drive.id) ? 0.6 : 1
                    }}
                  >
                    {appliedDrives.includes(drive.id) ? "✓ Applied" : "I have applied"}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Notifications;
