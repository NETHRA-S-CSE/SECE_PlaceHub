import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Newsroom() {
  const [appliedEvents, setAppliedEvents] = useState([]);

  // Load applied events from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem("appliedEvents");
    if (stored) {
      setAppliedEvents(JSON.parse(stored));
    }
  }, []);

  const events = [
    {
      id: 1,
      title: "Zoho Internship – Summer 2026",
      description: "Eligible students are requested to apply for the Zoho Summer Internship program using the link below.",
      deadline: "20 July 2026",
      registrationLink: "https://zoho.com/careers/internship"
    },
    {
      id: 2,
      title: "TCS CodeVita Registration",
      description: "Students interested in participating in the TCS CodeVita coding contest can register using the link below.",
      deadline: "15 July 2026",
      registrationLink: "https://tcs.com/codevita"
    },
    {
      id: 3,
      title: "Infosys Springboard Internship",
      description: "Infosys has opened registrations for its Springboard internship program. Interested students can apply.",
      deadline: "25 July 2026",
      registrationLink: "https://infosys.com/springboard"
    }
  ];

  const handleApply = (event) => {
    // Check if already applied
    if (appliedEvents.includes(event.id)) {
      alert("You have already applied for this event!");
      return;
    }

    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to apply for "${event.title}"?\n\nPlease ensure you have filled your profile with all required details before applying.`
    );

    if (confirmed) {
      // Get student profile from localStorage
      const profileData = localStorage.getItem("studentProfile");
      
      if (!profileData) {
        alert("Please complete your profile before applying to events!");
        return;
      }

      const profile = JSON.parse(profileData);
      
      // Check if profile is complete
      const isProfileComplete = profile.year && profile.registerNumber && 
                               profile.rollNumber && profile.department && 
                               profile.cgpa && profile.resumeLink;
      
      if (!isProfileComplete) {
        alert("Please complete all fields in your profile before applying!");
        return;
      }

      // Store application
      const application = {
        eventId: event.id,
        eventTitle: event.title,
        studentData: profile,
        appliedDate: new Date().toISOString()
      };

      // Get existing applications
      const existingApplications = JSON.parse(localStorage.getItem("eventApplications") || "[]");
      existingApplications.push(application);
      localStorage.setItem("eventApplications", JSON.stringify(existingApplications));

      // Update applied events list
      const newAppliedEvents = [...appliedEvents, event.id];
      setAppliedEvents(newAppliedEvents);
      localStorage.setItem("appliedEvents", JSON.stringify(newAppliedEvents));

      alert(`Successfully applied for "${event.title}"!\n\nYour application has been submitted to the Training & Placement Office.`);
    }
  };

  return (
    <div>
      <Header />

      <main>
        <h1>Placement Newsroom</h1>
        <p>
          All placement and internship related announcements posted by the
          Training & Placement Office will appear here.
        </p>

        {events.map((event) => (
          <div className="card" key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Deadline:</strong> {event.deadline}</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "15px" }}>
              <a 
                href={event.registrationLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontWeight: "500",
                  transition: "background-color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
              >
                View Registration Link
              </a>
              <button
                onClick={() => handleApply(event)}
                disabled={appliedEvents.includes(event.id)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: appliedEvents.includes(event.id) ? "#28a745" : "#ffc107",
                  color: appliedEvents.includes(event.id) ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "5px",
                  fontWeight: "500",
                  cursor: appliedEvents.includes(event.id) ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  opacity: appliedEvents.includes(event.id) ? 0.8 : 1
                }}
                onMouseEnter={(e) => {
                  if (!appliedEvents.includes(event.id)) {
                    e.target.style.backgroundColor = "#e0a800";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!appliedEvents.includes(event.id)) {
                    e.target.style.backgroundColor = "#ffc107";
                  }
                }}
              >
                {appliedEvents.includes(event.id) ? "✓ Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default Newsroom;
