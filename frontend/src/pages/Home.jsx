import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
    const [studentName, setStudentName] = useState("Student");
    const [profileComplete, setProfileComplete] = useState(false);

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("authData") || "{}");
        if (authData.username) {
            setStudentName(authData.username.charAt(0).toUpperCase() + authData.username.slice(1));
        }

        const profileData = localStorage.getItem("studentProfile");
        if (profileData) {
            const profile = JSON.parse(profileData);
            const isComplete = profile.year && profile.registerNumber && 
                             profile.rollNumber && profile.department && 
                             profile.cgpa && profile.resumeLink;
            setProfileComplete(isComplete);
        }
    }, []);

    return (
        <>
            <Header />
            <div style={{ padding: "20px" }}>
                <div style={{
                    backgroundColor: "#e7f3ff",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "30px",
                    border: "2px solid #b3d7ff"
                }}>
                    <h2 style={{ color: "#0056b3", marginBottom: "10px" }}>
                        Welcome back, {studentName}! 👋
                    </h2>
                    <p style={{ fontSize: "16px", color: "#495057" }}>
                        {profileComplete 
                            ? "Your profile is complete. You can now apply for placement opportunities!" 
                            : "⚠️ Please complete your profile to apply for placement opportunities."}
                    </p>
                </div>

                <h1>SECE PlaceHub</h1>
                <p style={{ fontSize: "18px", marginBottom: "20px" }}>
                    A Smart Placement Management & Analytics System
                </p>
                
                <ul style={{ fontSize: "16px", lineHeight: "2" }}>
                    <li>📝 Student Profile and Resume Management</li>
                    <li>✅ Prevents Missing Application Records</li>
                    <li>📊 Replaces Manual Tracking of Students</li>
                    <li>🎯 Efficient shortlisting for placement officers</li>
                </ul>

                <div style={{
                    marginTop: "30px",
                    padding: "20px",
                    backgroundColor: "#fff3cd",
                    borderRadius: "8px",
                    border: "1px solid #ffc107"
                }}>
                    <h3 style={{ marginBottom: "10px" }}>Quick Actions:</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "8px" }}>
                            <a href="/profile" style={{ color: "#007bff", textDecoration: "none", fontWeight: "500" }}>
                                {profileComplete ? "📝 Update" : "⚡ Complete"} Your Profile
                            </a>
                        </li>
                        <li style={{ marginBottom: "8px" }}>
                            <a href="/newsroom" style={{ color: "#007bff", textDecoration: "none", fontWeight: "500" }}>
                                📰 View Placement Opportunities
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;