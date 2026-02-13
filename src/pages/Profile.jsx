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

  const [errors, setErrors] = useState({
    registerNumber: "",
    rollNumber: "",
    cgpa: "",
    resumeLink: "",
  });

  const [completionPercent, setCompletionPercent] = useState(0);

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
    
    console.log("Profile Data:", formData);
    alert("Profile saved successfully! You can now apply for placement events.");
  };

  return (
    <>
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        <h1>Student Profile</h1>
        <p>Fill all details to complete your placement profile.</p>

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
  <label style={{ display: "flex", alignItems: "center", cursor: "pointer", padding: "10px 15px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: formData.year === "I" ? "#007bff" : "#fff", color: formData.year === "I" ? "#fff" : "#333", transition: "all 0.3s ease" }}>
    <input 
      type="radio" 
      name="year" 
      value="I"
      checked={formData.year === "I"}
      onChange={(e) => handleInputChange("year", e.target.value)}
      style={{ marginRight: "8px", cursor: "pointer" }}
    /> I Year
  </label>
  <label style={{ display: "flex", alignItems: "center", cursor: "pointer", padding: "10px 15px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: formData.year === "II" ? "#007bff" : "#fff", color: formData.year === "II" ? "#fff" : "#333", transition: "all 0.3s ease" }}>
    <input 
      type="radio" 
      name="year" 
      value="II"
      checked={formData.year === "II"}
      onChange={(e) => handleInputChange("year", e.target.value)}
      style={{ marginRight: "8px", cursor: "pointer" }}
    /> II Year
  </label>
  <label style={{ display: "flex", alignItems: "center", cursor: "pointer", padding: "10px 15px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: formData.year === "III" ? "#007bff" : "#fff", color: formData.year === "III" ? "#fff" : "#333", transition: "all 0.3s ease" }}>
    <input 
      type="radio" 
      name="year" 
      value="III"
      checked={formData.year === "III"}
      onChange={(e) => handleInputChange("year", e.target.value)}
      style={{ marginRight: "8px", cursor: "pointer" }}
    /> III Year
  </label>
  <label style={{ display: "flex", alignItems: "center", cursor: "pointer", padding: "10px 15px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: formData.year === "IV" ? "#007bff" : "#fff", color: formData.year === "IV" ? "#fff" : "#333", transition: "all 0.3s ease" }}>
    <input 
      type="radio" 
      name="year" 
      value="IV"
      checked={formData.year === "IV"}
      onChange={(e) => handleInputChange("year", e.target.value)}
      style={{ marginRight: "8px", cursor: "pointer" }}
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
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: errors.registerNumber ? "2px solid #dc3545" : "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease"
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
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: errors.rollNumber ? "2px solid #dc3545" : "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease"
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
  required
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    cursor: "pointer",
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
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: errors.cgpa ? "2px solid #dc3545" : "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease"
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
  style={{ 
    width: "100%", 
    maxWidth: "500px",
    padding: "12px 15px",
    fontSize: "16px",
    border: errors.resumeLink ? "2px solid #dc3545" : "2px solid #ddd",
    borderRadius: "8px",
    marginTop: "8px",
    outline: "none",
    transition: "border-color 0.3s ease"
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
    fontFamily: "inherit"
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
    fontFamily: "inherit"
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
    cursor: "pointer",
    padding: "12px 20px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: formData.profileVisibility === "public" ? "#28a745" : "#fff",
    color: formData.profileVisibility === "public" ? "#fff" : "#333",
    transition: "all 0.3s ease",
    fontWeight: "500"
  }}>
    <input
      type="radio"
      name="visibility"
      value="public"
      checked={formData.profileVisibility === "public"}
      onChange={(e) => handleInputChange("profileVisibility", e.target.value)}
      style={{ marginRight: "8px", cursor: "pointer" }}
    />
    🌐 Public (Visible to all students)
  </label>
  <label style={{
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "12px 20px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: formData.profileVisibility === "private" ? "#dc3545" : "#fff",
    color: formData.profileVisibility === "private" ? "#fff" : "#333",
    transition: "all 0.3s ease",
    fontWeight: "500"
  }}>
    <input
      type="radio"
      name="visibility"
      value="private"
      checked={formData.profileVisibility === "private"}
      onChange={(e) => handleInputChange("profileVisibility", e.target.value)}
      style={{ marginRight: "8px", cursor: "pointer" }}
    />
    🔒 Private (Hidden from students)
  </label>
</div>
<p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
  Note: Placement officers can view all profiles regardless of visibility setting.
</p>
<br />

<button 
  onClick={handleSaveProfile}
  style={{
    padding: "14px 40px",
    fontSize: "18px",
    fontWeight: "600",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 123, 255, 0.3)",
    marginTop: "10px"
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
  Save Profile
</button>

      </main>

      <Footer />
        </div>
        </>
    );

}

export default Profile;
