import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Creative-Battles | Home</title>
      </Helmet>
      <h2>This is Home</h2>
      <Banner/>
    </div>
  );
};

export default Home;
