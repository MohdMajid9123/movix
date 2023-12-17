import React, { useEffect, useState } from "react";

// react dom

import { useNavigate } from "react-router-dom";

// scss import
import "./HeroBanner.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
// import Img from "../../../component/lazyLoadiImage/img";
import Img from "../../../component/lazyLoadiImage/Img";
import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url?.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
    console.log(background);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop_img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity_layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover.Explore Now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search For a movie or tv show..."
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
