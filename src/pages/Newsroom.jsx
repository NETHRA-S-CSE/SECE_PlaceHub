import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Newsroom() {
  const [announcements] = useState([
    {
      id: 1,
      title: "Placement Orientation 2026",
      description: "All final year students are requested to attend the mandatory placement orientation session.",
      date: "15 February 2026",
      category: "Important"
    },
    {
      id: 2,
      title: "Resume Building Workshop",
      description: "Learn how to create an effective resume and cover letter. Industry experts will guide you through the process.",
      date: "20 February 2026",
      category: "Training"
    },
    {
      id: 3,
      title: "Mock Interview Sessions",
      description: "Register for mock interview sessions to prepare for upcoming placements. Limited slots available.",
      date: "25 February 2026",
      category: "Training"
    },
    {
      id: 4,
      title: "Placement Guidelines 2026",
      description: "Important guidelines and rules for placement season 2026. All students must read and follow these guidelines.",
      date: "10 February 2026",
      category: "Guidelines"
    }
  ]);

  return (
    <div>
      <Header />

      <main style={{ padding: "20px" }}>
        <h1>📰 Placement Newsroom</h1>
        <p style={{ fontSize: "16px", marginBottom: "20px" }}>
          General announcements, guidelines, and training programs for all students
        </p>

        <div style={{
          padding: "15px",
          backgroundColor: "#e7f3ff",
          border: "1px solid #b3d7ff",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <strong>ℹ️ Note:</strong> For placement opportunities specific to your eligibility, check the{" "}
          <a href="/notifications" style={{ color: "#007bff", textDecoration: "underline" }}>
            Notifications page
          </a>
        </div>

        {announcements.map((announcement) => (
          <div className="card" key={announcement.id} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <h3 style={{ margin: 0, color: "#333" }}>{announcement.title}</h3>
              <span style={{
                padding: "5px 12px",
                backgroundColor: 
                  announcement.category === "Important" ? "#dc3545" :
                  announcement.category === "Training" ? "#28a745" :
                  "#007bff",
                color: "#fff",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                {announcement.category}
              </span>
            </div>
            
            <p style={{ marginBottom: "10px" }}>{announcement.description}</p>
            
            <p style={{ fontSize: "14px", color: "#666", marginBottom: 0 }}>
              <strong>📅 Date:</strong> {announcement.date}
            </p>
          </div>
        ))}

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
            Check this page regularly for important announcements and guidelines from the Training & Placement Office.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Newsroom;
