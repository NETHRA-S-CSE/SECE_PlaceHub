import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/main.css";
function AdminDashboard() {
  return (
    <div>
      <Header />

      <main>
        <h1>Admin Dashboard</h1>
        <span className="admin-badge">Training & Placement Officer Panel</span>

        <div className="dashboard-container">
          
          {/* LEFT: Post Announcement */}
          <div className="dashboard-left">
            <h2 className="section-title">Post Placement Announcement</h2>
            <p>
              Announcements posted here will appear in the Student Newsroom.
            </p>

            <div className="form-group">
              <label>Title</label><br />
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Description</label><br />
              <textarea rows="4"></textarea>
            </div>

            <div className="form-group">
              <label>Registration / Application Link</label><br />
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Deadline</label><br />
              <input type="date" />
            </div>

            <button>Post Announcement</button>
          </div>

          {/* RIGHT: Newsroom Preview */}
          <div className="dashboard-right">
            <h2 className="section-title">Newsroom Preview</h2>

            <div className="card">
              <h3>Zoho Internship – Summer 2026</h3>
              <p>
                Eligible students are requested to apply using the link below.
              </p>
              <p><strong>Deadline:</strong> 20 July 2026</p>
              <a href="#">Apply Here</a>
            </div>

            <div className="card">
              <h3>TCS CodeVita Registration</h3>
              <p>
                Interested students can register for the coding contest.
              </p>
              <p><strong>Deadline:</strong> 15 July 2026</p>
              <a href="#">Register Now</a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
