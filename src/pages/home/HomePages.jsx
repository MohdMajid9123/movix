import React from "react";

import "./HomePages.scss";

import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

import HeroBanner from "./heroBanner/HeroBanner";
import Tranding from "./tranding/Tranding";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Tranding />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
