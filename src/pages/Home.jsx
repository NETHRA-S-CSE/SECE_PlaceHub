import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
    return (
        <>
        <Header />
        <div>
        <h1>SECE PlaceHub</h1>
        <p>A Smart Placement Management & Analytics System</p>
        <ul>
            <li>Student Profile and Resume Management</li>
            <li>Prevents Missing Application Records</li>
            <li>Replaces Manual Tracking of Sudents</li>
        </ul>
        </div>
        <Footer />
        </>
    )
}
export default Home;