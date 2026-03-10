import Hero from "../components/home/Hero";
import Footer from "../components/home/Footer";
import LatestCreations from "../components/home/LatestCreations";
import GitHubCTA from "../components/home/GitHubCTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <div id="creations">
        <LatestCreations />
      </div>

      <div id="contribute">
        <GitHubCTA />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
