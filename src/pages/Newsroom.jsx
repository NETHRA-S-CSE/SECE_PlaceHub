import Header from "../components/Header";
import Footer from "../components/Footer";

function Newsroom() {
  return (
    <div>
      <Header />

      <main>
        <h1>Placement Newsroom</h1>
        <p>
          All placement and internship related announcements posted by the
          Training & Placement Office will appear here.
        </p>

        <div className="card">
          <h3>Zoho Internship – Summer 2026</h3>
          <p>
            Eligible students are requested to apply for the Zoho Summer
            Internship program using the link below.
          </p>
          <p><strong>Deadline:</strong> 20 July 2026</p>
          <a href="#">Apply Here</a>
        </div>

        <div className="card">
          <h3>TCS CodeVita Registration</h3>
          <p>
            Students interested in participating in the TCS CodeVita coding
            contest can register using the link below.
          </p>
          <p><strong>Deadline:</strong> 15 July 2026</p>
          <a href="#">Register Now</a>
        </div>

        <div className="card">
          <h3>Infosys Springboard Internship</h3>
          <p>
            Infosys has opened registrations for its Springboard internship
            program. Interested students can apply.
          </p>
          <p><strong>Deadline:</strong> 25 July 2026</p>
          <a href="#">Apply Now</a>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Newsroom;
