import React, { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

// React Reduxe Toolkit
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

// React Router Dom

import { BrowserRouter, Route, Routes } from "react-router-dom";

// all file or folder import

import PageDetails from "./pages/details/PageDetails";
import SearchResult from "./pages/searchResult/SearchResult";
import PageExplore from "./pages/explore/PageExplore";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/HomePages";
import PageNotFound from "./pages/404/PageNotFound";

const App = () => {
  // this is dispatch
  const dispatch = useDispatch();

  // this is selector

  const majid = useSelector((state) => state.home);

  // useEffect Hooks
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  // Fetching Api
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
    console.log(allGenres);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<PageDetails />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<PageExplore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
