import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Profile() {
  const [formData, setFormData] = useState({
    year: "",
    registerNumber: "",
    rollNumber: "",
    department: "",
    cgpa: "",
    resumeLink: "",
    skills: "",
    certifications: "",
    profileVisibility: "public"
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const [errors, setErrors] = useState({
    registerNumber: "",
    rollNumber: "",
    cgpa: "",
    resumeLink: "",
  });

  const [completionPercent, setCompletionPercent] = useState(0);

  // Load saved profile on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setFormData(profileData);
      setOriginalData(profileData);
      
      // Check if profile is complete
      const isComplete = Object.values(profileData).every(field => field !== "");
      setIsProfileComplete(isComplete);
      setIsEditMode(!isComplete); // If not complete, enable edit mode by default
    } else {
      setIsEditMode(true); // If no profile, enable edit mode
    }
  }, []);

  // Calculate completion percentage whenever form data changes
  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field !== "").length;
    const totalFields = fields.length;
    const percent = Math.round((filledFields / totalFields) * 100);
    setCompletionPercent(percent);
  }, [formData]);

  // Validation functions
  const validateRegisterNumber = (value) => {
    if (!value) return "";
    if (!/^\d{12}$/.test(value)) {
      return "Register number must be exactly 12 digits";
    }
    return "";
  };

  const validateRollNumber = (value) => {
    if (!value) return "";
    if (!/^\d{2}[A-Z]{2}\d{3}$/.test(value)) {
      return "Roll number must be in format: 2 digits + 2 letters + 3 digits (e.g., 23CS157)";
    }
    return "";
  };

  const validateCGPA = (value) => {
    if (!value) return "";
    const cgpa = parseFloat(value);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      return "CGPA must be a number between 0 and 10";
    }
    return "";
  };

  const validateResumeLink = (value) => {
    if (!value) return "";
    const urlPattern = /^(https?:\/\/)?(www\.)?(drive\.google\.com|docs\.google\.com)\/.+/i;
    if (!urlPattern.test(value)) {
      return "Please provide a valid Google Drive link";
    }
    return "";
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validate on change
    let error = "";
    switch (field) {
      case "registerNumber":
        error = validateRegisterNumber(value);
        break;
      case "rollNumber":
        error = validateRollNumber(value);
        break;
      case "cgpa":
        error = validateCGPA(value);
        break;
      case "resumeLink":
        error = validateResumeLink(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleSaveProfile = () => {
    // Check if all fields are filled and valid
    const hasErrors = Object.values(errors).some(error => error !== "");
    const hasEmptyFields = Object.values(formData).some(field => field === "");

    if (hasEmptyFields) {
      alert("Please fill all fields before saving!");
      return;
    }

    if (hasErrors) {
      alert("Please correct all errors before saving!");
      return;
    }

    // Save profile to localStorage
    localStorage.setItem("studentProfile", JSON.stringify(formData));
    setOriginalData(formData);
    setIsProfileComplete(true);
    setIsEditMode(false);
    
    console.log("Profile Data:", formData);
    alert("Profile saved successfully! You can now apply for placement events.");
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    // Restore original data
    setFormData(originalData);
    setIsEditMode(false);
    
    // Clear any validation errors
    setErrors({
      registerNumber: "",
      rollNumber: "",
      cgpa: "",
      resumeLink: "",
    });
  };

  return (
    <>
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h1 style={{ marginBottom: "5px" }}>Student Profile</h1>
            <p style={{ marginBottom: "0" }}>
              {isProfileComplete && !isEditMode 
                ? "Your profile is complete. Click Edit to update details." 
                : "Fill all details to complete your placement profile."}
            </p>
          </div>
          
          {/* Edit/Save/Cancel Buttons */}
          {isProfileComplete && !isEditMode && (
            <button
              onClick={handleEditProfile}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                border: "2px solid #007bff",
                borderRadius: "8px",
                backgroundColor: "#fff",
                color: "#007bff",
                cursor: "pointer",
                transition: "all 0.3s ease"
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
              ✏️ Edit Profile
            </button>
          )}
        </div>

       <div className="progress-container">
  <div
    className="progress-bar"
    style={{ width: `${completionPercent}%` }}
  >
    {completionPercent}%
  </div>
</div>
        <p style={{ marginTop: "10px", fontWeight: "500", color: completionPercent === 100 ? "#28a745" : "#666" }}>
          Profile Completion: {completionPercent === 100 ? "Complete ✓" : `${completionPercent}% - Please fill all fields`}
        </p>

        <hr />

        {/* Profile form */}
        <h2>Academic Details</h2>

<label style={{ fontWeight: "600", fontSize: "16px" }}>Year of Study</label><br />
<div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "10px" }}>
  <label style={{ display: "flex", alignItems: "center", cursor: isEditMode ? "pointer" : "not-allowed", padding: "10px 15px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: formData.year === "I" ? "#007bff" : "#fff", color: formData.year === "I" ? "#fff" : "#333", transition: "all 0.3s ease", opacity: isEditMode ? 1 : 0.7 }}>
    <input 
      type="radio" 
      name="year" 
      value="I"
      checked={formData.year === "I"}
      onChange={(e) => handleInputChange("year", e.target.value)}
      disabled={!isEditMode}
      style={{ marginRight: "8px", cursor: isEditMode ? "pointer" : "not-allowed" }}
    /> I Year
  </label>
  <label style={{ display: "flex", alignItems: "center", cursor: isEditMode ? "pointer" : "not-allowed", padding: "10px 15px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: formData.year === "II" ? "#007bff" : "#fff", color: formData.year === "II" ? "#fff" : "#333", transition: "all 0.3s ease", opacity: isEditMode ? 1 : 0.7 }}>
    <input 
      type="radio" 
      name="year" 
      value="II"
      checked={formData.year === "II"}
      onChange={(e) => handleInputChange("year", e.target.value)}
      disabled={!isEditMode}
      style={{ marginRight: "8px", cursor: isEditMode ? "pointer" : "not-allowed" }}
    /> II Year
  </label>
  <label style={{ display: "flex", alignItems: "center", cursor: isEditMode ? "pointer" : "not-allowed", padding: "10px 15px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: formData.year === "III" ? "#007bff" : "#fff", color: formData.year === "III" ? "#fff" : "#333", transition: "all 0.3s ease", opacity: isEditMode ? 1 : 0.7 }}>
    <input 
      type="radio" 
      name="year" 
      value="III"
      checked={formData.year === "III"}
      onChange={(e) => handleInputChange("year", e.target.value)}
      disabled={!isEditMode}
      style={{ marginRight: "8px", cursor: isEditMode ? "pointer" : "not-allowed" }}
    /> III Year
  </label>
  <label style={{ display: "flex", alignItems: "center", cursor: isEditMode ? "pointer" : "not-allowed", padding: "10px 15px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: formData.year === "IV" ? "#007bff" : "#fff", color: formData.year === "IV" ? "#fff" : "#333", transition: "all 0.3s ease", opacity: isEditMode ? 1 : 0.7 }}>
    <input 
      type="radio" 
      name="year" 
      value="IV"
      checked={formData.year === "IV"}
      onChange={(e) => handleInputChange("year", e.target.value)}
      disabled={!isEditMode}
      style={{ marginRight: "8px", cursor: isEditMode ? "pointer" : "not-allowed" }}
    /> IV Year
  </label>
</div>
<br />

<label style={{ fontWeight: "600", fontSize: "16px" }}>Register Number</label><br />
<input
  type="text"
  placeholder="12 digit register number"
  maxLength="12"
  value={formData.registerNumber}
  onChange={(e) => handleInputChange("registerNumber", e.target.value)}
  disabled={!isEditMode}
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: errors.registerNumber ? "2px solid #dc3545" : "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
    backgroundColor: isEditMode ? "#fff" : "#f8f9fa",
    cursor: isEditMode ? "text" : "not-allowed"
  }}
  onFocus={(e) => !errors.registerNumber && (e.target.style.borderColor = "#007bff")}
  onBlur={(e) => !errors.registerNumber && (e.target.style.borderColor = "#ddd")}
  required
/>
{errors.registerNumber && (
  <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>
    ⚠️ {errors.registerNumber}
  </div>
)}
<br /><br />

<label style={{ fontWeight: "600", fontSize: "16px" }}>Roll Number</label><br />
<input
  type="text"
  placeholder="Eg: 23CS157"
  maxLength="7"
  value={formData.rollNumber}
  onChange={(e) => handleInputChange("rollNumber", e.target.value.toUpperCase())}
  disabled={!isEditMode}
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: errors.rollNumber ? "2px solid #dc3545" : "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
    backgroundColor: isEditMode ? "#fff" : "#f8f9fa",
    cursor: isEditMode ? "text" : "not-allowed"
  }}
  onFocus={(e) => !errors.rollNumber && (e.target.style.borderColor = "#007bff")}
  onBlur={(e) => !errors.rollNumber && (e.target.style.borderColor = "#ddd")}
  required
/>
{errors.rollNumber && (
  <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>
    ⚠️ {errors.rollNumber}
  </div>
)}
<br /><br />

<label style={{ fontWeight: "600", fontSize: "16px" }}>Department</label><br />
<select 
  value={formData.department}
  onChange={(e) => handleInputChange("department", e.target.value)}
  disabled={!isEditMode}
  required
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: isEditMode ? "#fff" : "#f8f9fa",
    cursor: isEditMode ? "pointer" : "not-allowed",
    marginTop: "8px",
    transition: "border-color 0.3s ease",
    outline: "none"
  }}
  onFocus={(e) => e.target.style.borderColor = "#007bff"}
  onBlur={(e) => e.target.style.borderColor = "#ddd"}
>
  <option value="">-- Select Department --</option>
  <option value="CSE">CSE</option>
  <option value="CSE(AIML)">CSE (AIML)</option>
  <option value="CSE(CYS)">CSE (CYS)</option>
  <option value="AIDS">AIDS</option>
  <option value="ECE">ECE</option>
  <option value="EEE">EEE</option>
  <option value="MECH">MECH</option>
  <option value="CCE">CCE</option>
  <option value="CSBS">CSBS</option>
  <option value="IT">IT</option>
</select>
<br /><br />


<label style={{ fontWeight: "600", fontSize: "16px" }}>CGPA</label><br />
<input 
  type="text" 
  placeholder="Enter your CGPA (e.g., 8.5)"
  value={formData.cgpa}
  onChange={(e) => handleInputChange("cgpa", e.target.value)}
  disabled={!isEditMode}
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: errors.cgpa ? "2px solid #dc3545" : "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
    backgroundColor: isEditMode ? "#fff" : "#f8f9fa",
    cursor: isEditMode ? "text" : "not-allowed"
  }}
  onFocus={(e) => !errors.cgpa && (e.target.style.borderColor = "#007bff")}
  onBlur={(e) => !errors.cgpa && (e.target.style.borderColor = "#ddd")}
/>
{errors.cgpa && (
  <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>
    ⚠️ {errors.cgpa}
  </div>
)}
<br /><br />


<h2>Resume</h2>
<label style={{ fontWeight: "600", fontSize: "16px" }}>Resume Drive Link</label><br />
<input 
  type="text" 
  placeholder="Paste your Google Drive resume link here"
  value={formData.resumeLink}
  onChange={(e) => handleInputChange("resumeLink", e.target.value)}
  disabled={!isEditMode}
  style={{ 
    width: "100%", 
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: errors.resumeLink ? "2px solid #dc3545" : "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
    backgroundColor: isEditMode ? "#fff" : "#f8f9fa",
    cursor: isEditMode ? "text" : "not-allowed"
  }}
  onFocus={(e) => !errors.resumeLink && (e.target.style.borderColor = "#007bff")}
  onBlur={(e) => !errors.resumeLink && (e.target.style.borderColor = "#ddd")}
/>
{errors.resumeLink && (
  <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>
    ⚠️ {errors.resumeLink}
  </div>
)}
<br /><br />

<h2>Skills & Certifications</h2>

<label style={{ fontWeight: "600", fontSize: "16px" }}>Technical Skills</label><br />
<textarea 
  placeholder="Enter your technical skills (e.g., Python, Java, React, SQL)"
  value={formData.skills}
  onChange={(e) => handleInputChange("skills", e.target.value)}
  disabled={!isEditMode}
  rows="3"
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
    fontFamily: "inherit",
    backgroundColor: isEditMode ? "#fff" : "#f8f9fa",
    cursor: isEditMode ? "text" : "not-allowed",
    resize: "vertical"
  }}
  onFocus={(e) => e.target.style.borderColor = "#007bff"}
  onBlur={(e) => e.target.style.borderColor = "#ddd"}
/>
<br /><br />

<label style={{ fontWeight: "600", fontSize: "16px" }}>Certifications (Optional)</label><br />
<textarea 
  placeholder="List any certifications you have (e.g., AWS Certified, Oracle Java)"
  value={formData.certifications}
  onChange={(e) => handleInputChange("certifications", e.target.value)}
  disabled={!isEditMode}
  rows="3"
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
    fontFamily: "inherit",
    backgroundColor: isEditMode ? "#fff" : "#f8f9fa",
    cursor: isEditMode ? "text" : "not-allowed",
    resize: "vertical"
  }}
  onFocus={(e) => e.target.style.borderColor = "#007bff"}
  onBlur={(e) => e.target.style.borderColor = "#ddd"}
/>
<br /><br />

<h2>Profile Visibility</h2>
<label style={{ fontWeight: "600", fontSize: "16px" }}>Who can see your profile?</label><br />
<div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
  <label style={{
    display: "flex",
    alignItems: "center",
    cursor: isEditMode ? "pointer" : "not-allowed",
    padding: "12px 20px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: formData.profileVisibility === "public" ? "#28a745" : "#fff",
    color: formData.profileVisibility === "public" ? "#fff" : "#333",
    transition: "all 0.3s ease",
    fontWeight: "500",
    opacity: isEditMode ? 1 : 0.7
  }}>
    <input
      type="radio"
      name="visibility"
      value="public"
      checked={formData.profileVisibility === "public"}
      onChange={(e) => handleInputChange("profileVisibility", e.target.value)}
      disabled={!isEditMode}
      style={{ marginRight: "8px", cursor: isEditMode ? "pointer" : "not-allowed" }}
    />
    🌐 Public (Visible to all students)
  </label>
  <label style={{
    display: "flex",
    alignItems: "center",
    cursor: isEditMode ? "pointer" : "not-allowed",
    padding: "12px 20px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: formData.profileVisibility === "private" ? "#dc3545" : "#fff",
    color: formData.profileVisibility === "private" ? "#fff" : "#333",
    transition: "all 0.3s ease",
    fontWeight: "500",
    opacity: isEditMode ? 1 : 0.7
  }}>
    <input
      type="radio"
      name="visibility"
      value="private"
      checked={formData.profileVisibility === "private"}
      onChange={(e) => handleInputChange("profileVisibility", e.target.value)}
      disabled={!isEditMode}
      style={{ marginRight: "8px", cursor: isEditMode ? "pointer" : "not-allowed" }}
    />
    🔒 Private (Hidden from students)
  </label>
</div>
<p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
  Note: Placement officers can view all profiles regardless of visibility setting.
</p>
<br />

{/* Save and Cancel Buttons - Only show when in edit mode */}
{isEditMode && (
  <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
    <button 
      onClick={handleSaveProfile}
      style={{
        padding: "14px 40px",
        fontSize: "18px",
        fontWeight: "600",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 6px rgba(40, 167, 69, 0.3)"
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#218838";
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 6px 12px rgba(40, 167, 69, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#28a745";
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 4px 6px rgba(40, 167, 69, 0.3)";
      }}
    >
      💾 Save Profile
    </button>
    
    {isProfileComplete && (
      <button 
        onClick={handleCancelEdit}
        style={{
          padding: "14px 40px",
          fontSize: "18px",
          fontWeight: "600",
          backgroundColor: "#fff",
          color: "#6c757d",
          border: "2px solid #6c757d",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#6c757d";
          e.target.style.color = "#fff";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#fff";
          e.target.style.color = "#6c757d";
          e.target.style.transform = "translateY(0)";
        }}
      >
        ❌ Cancel
      </button>
    )}
  </div>
)}

      </main>

      <Footer />
        </div>
        </>
    );

}

export default Profile;
