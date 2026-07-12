import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import FeaturedPG from "../../components/FeaturedPG/FeaturedPG";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedPG />
      <Footer />
    </>
  );
}

export default Home;