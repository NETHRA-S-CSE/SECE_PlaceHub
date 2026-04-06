import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { driveAPI, applicationAPI } from "../services/api";

function Newsroom() {
  const [placementDrives, setPlacementDrives] = useState([]);
  const [appliedDrives, setAppliedDrives] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch placement drives from backend
  useEffect(() => {
    const fetchDrives = async () => {
      try {
        setLoading(true);
        const response = await driveAPI.getAllDrives();
        
        if (response.success) {
          // Sort by deadline (most recent first)
          const sortedDrives = response.data.sort((a, b) => {
            return new Date(b.deadline) - new Date(a.deadline);
          });
          setPlacementDrives(sortedDrives);
        }
        
        // Load applied drives from localStorage (keeping user's local application state)
        const appliedDrivesData = JSON.parse(localStorage.getItem("appliedDrives") || "[]");
        setAppliedDrives(appliedDrivesData);
      } catch (err) {
        console.error("Error fetching drives:", err);
        setError("Failed to load placement drives. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch drives immediately and then refresh every 5 seconds
    fetchDrives();
    const interval = setInterval(fetchDrives, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleApplyClick = (drive) => {
    // Check if profile is complete
    const studentProfile = JSON.parse(localStorage.getItem("studentProfile") || "{}");
    
    if (!studentProfile.registerNumber || !studentProfile.year || !studentProfile.department) {
      alert("⚠️ Please complete your profile first before applying for events!");
      window.location.href = "/profile";
      return;
    }

    // Verify eligibility
    const yearMatch = drive.eligibleYears.includes(studentProfile.year);
    const deptMatch = drive.eligibleDepartments.includes(studentProfile.department);
    const cgpaMatch = parseFloat(studentProfile.cgpa) >= parseFloat(drive.minCGPA);

    if (!yearMatch || !deptMatch || !cgpaMatch) {
      alert(`⚠️ You are not eligible for this drive.\n\nRequirements:\n• Years: ${drive.eligibleYears.join(", ")}\n• Departments: ${drive.eligibleDepartments.join(", ")}\n• Minimum CGPA: ${drive.minCGPA}\n\nYour Profile:\n• Year: ${studentProfile.year}\n• Department: ${studentProfile.department}\n• CGPA: ${studentProfile.cgpa}`);
      return;
    }

    setSelectedEvent(drive);
    setShowConfirmModal(true);
  };

  const handleConfirmApply = async () => {
    try {
      const studentProfile = JSON.parse(localStorage.getItem("studentProfile") || "{}");
      const authData = JSON.parse(localStorage.getItem("authData") || "{}");

      // Prepare application data
      const applicationData = {
        driveId: selectedEvent._id,
        driveTitle: selectedEvent.title,
        studentId: authData.username || "unknown",
        studentData: studentProfile
      };

      // Send application to backend
      const response = await applicationAPI.applyForDrive(applicationData);
      
      if (response.success) {
        // Mark as applied in appliedDrives (localStorage for UI state)
        const newAppliedDrives = [...appliedDrives, selectedEvent._id];
        setAppliedDrives(newAppliedDrives);
        localStorage.setItem("appliedDrives", JSON.stringify(newAppliedDrives));

        setShowConfirmModal(false);
        setSelectedEvent(null);
        
        alert("✅ Successfully applied for " + selectedEvent.title + "!");
      }
    } catch (err) {
      console.error("Error applying for drive:", err);
      alert("⚠️ Failed to apply for this drive. Please try again.");
    }
  };

  const handleCancelApply = () => {
    setShowConfirmModal(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        <h1>📰 Placement Newsroom</h1>
        <p style={{ fontSize: "16px", marginBottom: "20px" }}>
          Latest placement drives and internship opportunities posted by the Placement Office
        </p>

        {error && (
          <div style={{
            padding: "15px",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "8px",
            marginBottom: "20px",
            color: "#721c24"
          }}>
            <strong>⚠️ Error:</strong> {error}
          </div>
        )}

        {loading ? (
          <div className="card" style={{ 
            textAlign: "center", 
            padding: "40px",
            backgroundColor: "#e7f3ff",
            border: "2px solid #b3d7ff"
          }}>
            <h3 style={{ color: "#0056b3" }}>⏳ Loading Opportunities...</h3>
            <p style={{ color: "#495057" }}>
              Fetching latest placement drives from the server
            </p>
          </div>
        ) : placementDrives.length === 0 ? (
          <div className="card" style={{ 
            textAlign: "center", 
            padding: "40px",
            backgroundColor: "#e7f3ff",
            border: "2px solid #b3d7ff"
          }}>
            <h3 style={{ color: "#0056b3" }}>📭 No Opportunities Yet</h3>
            <p style={{ color: "#495057" }}>
              No placement drives have been posted yet. Check back later for new opportunities!
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
              <strong>✓ {placementDrives.length} Placement {placementDrives.length === 1 ? 'Drive' : 'Drives'} Available</strong>
              <p style={{ fontSize: "14px", marginTop: "5px", marginBottom: 0 }}>
                Review eligibility criteria before applying to any opportunity
              </p>
            </div>

            {placementDrives.map((drive) => {
              const isApplied = appliedDrives.includes(drive._id);

              return (
                <div className="card" key={drive._id} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <h3 style={{ margin: 0, color: "#333" }}>{drive.title}</h3>
                    <span style={{
                      padding: "5px 12px",
                      backgroundColor: "#6f42c1",
                      color: "#fff",
                      borderRadius: "5px",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}>
                      Placement Drive
                    </span>
                  </div>
                  
                  <p style={{ marginBottom: "10px" }}>{drive.description}</p>
                  
                  <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                    <strong>📅 Deadline:</strong> {new Date(drive.deadline).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>

                  {/* Eligibility criteria */}
                  <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "12px",
                    borderRadius: "6px",
                    marginBottom: "15px",
                    border: "1px solid #dee2e6"
                  }}>
                    <p style={{ 
                      fontSize: "13px", 
                      fontWeight: "600", 
                      marginBottom: "8px",
                      color: "#495057"
                    }}>
                      📋 Eligibility Criteria:
                    </p>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "8px",
                      fontSize: "13px"
                    }}>
                      <div>
                        <strong>Years:</strong> {drive.eligibleYears.join(", ")}
                      </div>
                      <div>
                        <strong>Departments:</strong> {drive.eligibleDepartments.join(", ")}
                      </div>
                      <div>
                        <strong>Min CGPA:</strong> {drive.minCGPA}
                      </div>
                    </div>
                  </div>

                  {/* Registration Link */}
                  <div style={{ marginBottom: "15px" }}>
                    <a 
                      href={drive.registrationLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="registration-link"
                      style={{
                        display: "inline-block",
                        color: "#007bff",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "600",
                        padding: "8px 16px",
                        border: "2px solid #007bff",
                        borderRadius: "6px",
                        transition: "all 0.3s ease",
                        backgroundColor: "#fff"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                        e.target.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#fff";
                        e.target.style.color = "#007bff";
                      }}
                    >
                      🔗 Registration Link
                    </a>
                  </div>

                  {/* Apply Button */}
                  <button 
                    onClick={() => handleApplyClick(drive)}
                    disabled={isApplied}
                    className="apply-button"
                    style={{
                      padding: "10px 24px",
                      fontSize: "16px",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "8px",
                      cursor: isApplied ? "not-allowed" : "pointer",
                      backgroundColor: isApplied ? "#6c757d" : "#28a745",
                      color: "#fff",
                      transition: "all 0.3s ease",
                      width: "100%",
                      opacity: isApplied ? "0.6" : "1"
                    }}
                    onMouseEnter={(e) => {
                      if (!isApplied) {
                        e.target.style.backgroundColor = "#218838";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isApplied) {
                        e.target.style.backgroundColor = "#28a745";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  >
                    {isApplied ? "✓ Applied" : "Apply Now"}
                  </button>
                </div>
              );
            })}
          </>
        )}

        <div style={{
          padding: "20px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "8px",
          marginTop: "30px",
          textAlign: "center"
        }}>
          <h3 style={{ color: "#856404", marginBottom: "10px" }}>📢 Stay Updated!</h3>
          <p style={{ color: "#856404", marginBottom: 0 }}>
            Check this page regularly for new placement drives and internship opportunities from the Training & Placement Office.
          </p>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div 
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div 
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              maxWidth: "500px",
              width: "90%",
              animation: "slideDown 0.3s ease"
            }}
          >
            <h2 style={{ 
              color: "#333", 
              marginBottom: "15px",
              fontSize: "24px",
              fontWeight: "700"
            }}>
              Confirm Application
            </h2>
            
            <div style={{
              backgroundColor: "#e7f3ff",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "2px solid #b3d7ff"
            }}>
              <p style={{ 
                fontSize: "16px", 
                color: "#0056b3",
                marginBottom: "8px",
                fontWeight: "600"
              }}>
                {selectedEvent?.title}
              </p>
              <p style={{ 
                fontSize: "14px", 
                color: "#495057",
                marginBottom: "0"
              }}>
                📅 Deadline: {selectedEvent && new Date(selectedEvent.deadline).toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            <p style={{ 
              fontSize: "16px", 
              color: "#495057",
              marginBottom: "25px",
              lineHeight: "1.6"
            }}>
              Are you sure you want to apply for this placement drive? Your profile information will be submitted to the Training & Placement Office.
            </p>

            <div style={{ 
              display: "flex", 
              gap: "15px",
              justifyContent: "flex-end"
            }}>
              <button
                onClick={handleCancelApply}
                style={{
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "2px solid #6c757d",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  color: "#6c757d",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#6c757d";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.color = "#6c757d";
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={handleConfirmApply}
                style={{
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#218838";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#28a745";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Confirm & Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Newsroom;
