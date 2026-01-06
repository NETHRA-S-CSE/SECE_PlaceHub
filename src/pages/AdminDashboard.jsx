import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminDashboard() {
  return (
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        <h1>Admin Dashboard</h1>
        <p>Training & Placement Officer Panel</p>

        <hr />

        {/* Post Announcement Section */}
        <h2>Post Placement Announcement</h2>
        <p>
          Any updates posted here will be visible to students in the Newsroom
          section.
        </p>

        <label>Title</label><br />
        <input type="text" style={{ width: "400px" }} /><br /><br />

        <label>Description</label><br />
        <textarea rows="4" cols="60"></textarea><br /><br />

        <label>Registration / Application Link</label><br />
        <input type="text" style={{ width: "400px" }} /><br /><br />

        <label>Deadline</label><br />
        <input type="date" /><br /><br />

        <button>Post Announcement</button>

        <hr style={{ margin: "30px 0" }} />

        {/* Newsroom Preview */}
        <h2>Newsroom Preview</h2>

        <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px" }}>
          <h3>Zoho Internship – Summer 2026</h3>
          <p>Eligible students are requested to apply using the link below.</p>
          <p><strong>Deadline:</strong> 20 July 2026</p>
          <a href="#">Apply Here</a>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "15px" }}>
          <h3>TCS CodeVita Registration</h3>
          <p>Interested students can register for the coding contest.</p>
          <p><strong>Deadline:</strong> 15 July 2026</p>
          <a href="#">Register Now</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
