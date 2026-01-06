import Header from "../components/Header";
import Footer from "../components/Footer";

function Profile() {
    
         const totalFields = 8;
  const filledFields = 5;
  const completionPercent = Math.round((filledFields / totalFields) * 100);

  return (
    <>
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        <h1>Student Profile</h1>
        <p>Fill all details to complete your placement profile.</p>

        {/* Profile completion tracker */}
        <div style={{ margin: "20px 0" }}>
          <p><strong>Profile Completion:</strong> {completionPercent}%</p>
          <div style={{ width: "100%", backgroundColor: "#ddd", height: "20px" }}>
            <div
              style={{
                width: `${completionPercent}%`,
                backgroundColor: "#4caf50",
                height: "20px"
              }}
            ></div>
          </div>
          <p>{filledFields} out of {totalFields} fields completed</p>
        </div>

        <hr />

        {/* Profile form */}
        <h2>Academic Details</h2>
        <label>Register Number</label><br />
        <input type="text" /><br /><br />

        <label>Department</label><br />
        <input type="text" /><br /><br />

        <label>CGPA</label><br />
        <input type="text" /><br /><br />

        <h2>Skills</h2>
        <label>Technical Skills</label><br />
        <input type="text" placeholder="Eg: Python, Java, DSA" /><br /><br />

        <label>Certifications (Optional)</label><br />
        <input type="text" /><br /><br />

        <h2>Resume</h2>
        <label>Upload Resume</label><br />
        <input type="file" /><br /><br />

        <button>Save Profile</button>
      </main>

      <Footer />
        </div>
        </>
    );

}

export default Profile;
