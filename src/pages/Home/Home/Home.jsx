import { Helmet } from "react-helmet";
import Advertises from "../../../Components/Advertises";
import PopularContest from "../../../Components/PopularContest";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Creative-Battles | Home</title>
      </Helmet>
      <h2>This is Home</h2>
      <Banner />
      <PopularContest />
      <Advertises />
    </div>
  );
};

export default Home;
