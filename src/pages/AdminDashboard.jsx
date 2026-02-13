import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/main.css";

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [driveForm, setDriveForm] = useState({
    title: "",
    description: "",
    registrationLink: "",
    deadline: "",
    eligibleYears: [],
    eligibleDepartments: [],
    minCGPA: ""
  });

  // Load applications from localStorage
  useEffect(() => {
    const loadApplications = () => {
      const stored = localStorage.getItem("driveApplications");
      if (stored) {
        setApplications(JSON.parse(stored));
      }
    };
    loadApplications();

    // Refresh applications every 2 seconds to show real-time updates
    const interval = setInterval(loadApplications, 2000);
    return () => clearInterval(interval);
  }, []);

  // Get unique drives with application counts
  const driveSummary = applications.reduce((acc, app) => {
    const existing = acc.find(e => e.driveId === app.driveId);
    if (existing) {
      existing.count++;
      existing.applications.push(app);
    } else {
      acc.push({
        driveId: app.driveId,
        driveTitle: app.driveTitle,
        count: 1,
        applications: [app]
      });
    }
    return acc;
  }, []);

  // Export to Excel
  const handleExportToExcel = (drive) => {
    const driveApps = drive.applications;
    
    if (driveApps.length === 0) {
      alert("No applications to export!");
      return;
    }

    // Prepare data for Excel
    const excelData = driveApps.map((app, index) => ({
      "S.No": index + 1,
      "Register Number": app.studentData.registerNumber,
      "Roll Number": app.studentData.rollNumber,
      "Year": app.studentData.year,
      "Department": app.studentData.department,
      "CGPA": app.studentData.cgpa,
      "Resume Link": app.studentData.resumeLink,
      "Applied Date": new Date(app.appliedDate).toLocaleString()
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths
    worksheet['!cols'] = [
      { wch: 6 },  // S.No
      { wch: 18 }, // Register Number
      { wch: 12 }, // Roll Number
      { wch: 8 },  // Year
      { wch: 15 }, // Department
      { wch: 8 },  // CGPA
      { wch: 50 }, // Resume Link
      { wch: 20 }  // Applied Date
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    // Generate file name
    const fileName = `${drive.companyName.replace(/[^a-z0-9]/gi, '_')}_Applications.xlsx`;

    // Download file
    XLSX.writeFile(workbook, fileName);
    
    alert(`Excel file "${fileName}" downloaded successfully!`);
  };

  const handlePostDrive = (e) => {
    e.preventDefault();
    
    if (!driveForm.title || !driveForm.description || !driveForm.registrationLink || 
        !driveForm.deadline || driveForm.eligibleYears.length === 0 || 
        driveForm.eligibleDepartments.length === 0 || !driveForm.minCGPA) {
      alert("Please fill all required fields!");
      return;
    }

    const newDrive = {
      id: Date.now(),
      ...driveForm,
      postedDate: new Date().toISOString(),
      type: "placement" // or "internship"
    };

    const existingDrives = JSON.parse(localStorage.getItem("placementDrives") || "[]");
    existingDrives.push(newDrive);
    localStorage.setItem("placementDrives", JSON.stringify(existingDrives));

    alert(`Placement drive "${driveForm.title}" posted successfully!`);
    
    // Reset form
    setDriveForm({
      title: "",
      description: "",
      registrationLink: "",
      deadline: "",
      eligibleYears: [],
      eligibleDepartments: [],
      minCGPA: ""
    });
  };

  const handleYearToggle = (year) => {
    setDriveForm(prev => ({
      ...prev,
      eligibleYears: prev.eligibleYears.includes(year)
        ? prev.eligibleYears.filter(y => y !== year)
        : [...prev.eligibleYears, year]
    }));
  };

  const handleDepartmentToggle = (dept) => {
    setDriveForm(prev => ({
      ...prev,
      eligibleDepartments: prev.eligibleDepartments.includes(dept)
        ? prev.eligibleDepartments.filter(d => d !== dept)
        : [...prev.eligibleDepartments, dept]
    }));
  };

  return (
    <div>
      <Header />

      <main>
        
        {/* Welcome Banner */}
        <div style={{
          backgroundColor: "#e7f3ff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "2px solid #b3d7ff"
        }}>
          <h2 style={{ color: "#0056b3", marginBottom: "10px" }}>
            👔 Welcome, Placement Officer!
          </h2>
          <p style={{ fontSize: "16px", color: "#495057" }}>
            Manage placement announcements and track student applications from this dashboard.
          </p>
        </div>
     
        <span className="admin-badge">Training & Placement Officer Panel</span>

        <div className="dashboard-container">
          
          {/* LEFT: Post Placement Drive */}
          <div className="dashboard-left">
            <h2 className="section-title">Create Placement Drive</h2>
            <p>
              Post a new placement or internship opportunity with eligibility criteria.
            </p>

            <form onSubmit={handlePostDrive}>
              <div className="form-group">
                <label>Company / Opportunity Title</label><br />
                <input 
                  type="text" 
                  value={driveForm.title}
                  onChange={(e) => setDriveForm({...driveForm, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label><br />
                <textarea 
                  rows="4"
                  value={driveForm.description}
                  onChange={(e) => setDriveForm({...driveForm, description: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Registration / Application Link</label><br />
                <input 
                  type="url" 
                  value={driveForm.registrationLink}
                  onChange={(e) => setDriveForm({...driveForm, registrationLink: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Deadline</label><br />
                <input 
                  type="date" 
                  value={driveForm.deadline}
                  onChange={(e) => setDriveForm({...driveForm, deadline: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Eligible Years</label><br />
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                  {["I", "II", "III", "IV"].map(year => (
                    <label key={year} style={{ cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={driveForm.eligibleYears.includes(year)}
                        onChange={() => handleYearToggle(year)}
                        style={{ marginRight: "5px" }}
                      />
                      {year} Year
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Eligible Departments</label><br />
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                  {["CSE", "CSE(AIML)", "CSE(CYS)", "AIDS", "ECE", "EEE", "MECH", "CCE", "CSBS", "IT"].map(dept => (
                    <label key={dept} style={{ cursor: "pointer", fontSize: "14px" }}>
                      <input
                        type="checkbox"
                        checked={driveForm.eligibleDepartments.includes(dept)}
                        onChange={() => handleDepartmentToggle(dept)}
                        style={{ marginRight: "5px" }}
                      />
                      {dept}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Minimum CGPA</label><br />
                <input 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="10"
                  value={driveForm.minCGPA}
                  onChange={(e) => setDriveForm({...driveForm, minCGPA: e.target.value})}
                  required
                />
              </div>

              <button type="submit">Post Drive</button>
            </form>
          </div>

          {/* RIGHT: Applications Management */}
          <div className="dashboard-right">
            <h2 className="section-title">Drive Applications</h2>

            {driveSummary.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: "30px" }}>
                <p style={{ color: "#666", fontSize: "16px" }}>
                  No applications received yet.
                </p>
              </div>
            ) : (
              <>
                {driveSummary.map((drive) => (
                  <div className="card" key={drive.driveId} style={{ marginBottom: "20px" }}>
                    <h3 style={{ marginBottom: "10px", color: "#333" }}>{drive.driveTitle}</h3>
                    <p style={{ fontSize: "18px", fontWeight: "600", color: "#007bff", marginBottom: "15px" }}>
                      Total Applications: {drive.count}
                    </p>
                    
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button
                        onClick={() => setSelectedEvent(selectedEvent === drive.driveId ? null : drive.driveId)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
                      >
                        {selectedEvent === drive.driveId ? "Hide Details" : "View Student Details"}
                      </button>
                      
                      <button
                        onClick={() => handleExportToExcel(drive)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#17a2b8",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#138496"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#17a2b8"}
                      >
                        📥 Download Excel
                      </button>
                    </div>

                    {/* Expanded Student Details */}
                    {selectedEvent === drive.driveId && (
                      <div style={{
                        marginTop: "20px",
                        padding: "15px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #dee2e6"
                      }}>
                        <h4 style={{ marginBottom: "15px", color: "#495057" }}>Student List:</h4>
                        
                        <div style={{ overflowX: "auto" }}>
                          <table style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "14px"
                          }}>
                            <thead>
                              <tr style={{ backgroundColor: "#e9ecef" }}>
                                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>S.No</th>
                                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>Register No</th>
                                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>Roll No</th>
                                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>Year</th>
                                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>Dept</th>
                                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>CGPA</th>
                                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #dee2e6" }}>Resume</th>
                              </tr>
                            </thead>
                            <tbody>
                              {drive.applications.map((app, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>{index + 1}</td>
                                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>{app.studentData.registerNumber}</td>
                                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>{app.studentData.rollNumber}</td>
                                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>{app.studentData.year}</td>
                                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>{app.studentData.department}</td>
                                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>{app.studentData.cgpa}</td>
                                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>
                                    <a 
                                      href={app.studentData.resumeLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      style={{ color: "#007bff", textDecoration: "none" }}
                                    >
                                      View Resume
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
