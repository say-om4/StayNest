import "./About.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function About() {
  return (
    <>
      <Navbar />

      <section className="about-page">
        <div className="container">

          <h1>About PG Life</h1>

          <p className="about-text">
            PG Life is a modern PG accommodation platform that helps students
            and working professionals find verified Paying Guest accommodations
            with ease.
          </p>

          <div className="about-cards">

            <div className="about-card">
              <h3>🏠 Verified PGs</h3>
              <p>Only trusted and verified PG accommodations.</p>
            </div>

            <div className="about-card">
              <h3>⚡ Easy Booking</h3>
              <p>Book your favourite PG within seconds.</p>
            </div>

            <div className="about-card">
              <h3>❤️ Wishlist</h3>
              <p>Save your favourite PGs and compare later.</p>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;