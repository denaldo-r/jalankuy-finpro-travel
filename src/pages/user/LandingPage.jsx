import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import PopularActivities from "../../components/PopularActivities";
import Newsletter from "../../components/Newsletter";
import BookTripSteps from "../../components/BookTripSteps";

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      <Hero />
      <BookTripSteps />
      <PopularActivities />
      <Newsletter />

      <Footer />
    </div>
  );
};

export default LandingPage;
