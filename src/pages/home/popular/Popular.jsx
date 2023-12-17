import React, { useState } from "react";

import Crousel from "../../../component/crousel/Crousel";

import useFetch from "../../../hooks/useFetch";

import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";
import SwitchTable from "../../../component/switchTable/SwitchTable";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movie" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Popular</span>
        <SwitchTable data={["Movie", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Crousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
