import React, { useEffect, useState } from "react";

// react dom

import { useNavigate } from "react-router-dom";

// scss import
import "./HeroBanner.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../component/lazyLoadiImage/Img";
import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  console.log(background);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const generateBackground = () => {
      const randomMovie = data?.results?.[Math?.floor(Math?.random() * 20)];

      if (url?.backdrop && randomMovie?.backdrop_path) {
        const bg = url.backdrop + randomMovie.backdrop_path;
        setBackground(bg);
      }
    };

    generateBackground();
  }, [data, url]);

  const searchQueryHandler = (e) => {
    if ((e.key === "Enter" || e.type === "click") && query.length > 0) {
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
            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
