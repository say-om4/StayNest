import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="overlay"></div>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="container">
        <div className="hero-card" data-aos="zoom-in">

          <span className="badge-custom">🏠 Trusted PG Finder</span>

          <h1>
            Find Your <span>Perfect PG</span>
          </h1>

          <p>
            Discover verified PGs with modern facilities, affordable prices,
            and prime locations near your college or workplace.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Enter City (e.g. Delhi, Bangalore)"
            />

            <button>
              Search
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;