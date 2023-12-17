import React, { useState } from "react";

import Crousel from "../../../component/crousel/Crousel";

import useFetch from "../../../hooks/useFetch";

import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";
import SwitchTable from "../../../component/switchTable/SwitchTable";

const Tranding = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTable data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Crousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Tranding;
