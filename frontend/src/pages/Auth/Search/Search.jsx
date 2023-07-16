import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ListItem from "../ListItem/ListItem";
import "./Search.scss";
import { useSelector } from "react-redux";

const Search = () => {
  const [dataMovie, setDataMovie] = useState([]);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  useEffect(() => {
    const getSearch = async () => {
      try {
        const res = await axiosInstance.get("movie/find/", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        });
        setDataMovie(res.data);
      } catch (err) {
        setDataMovie("");
      }
    };
    getSearch();
  });

  const searchInfo = useSelector((state) => state.search.searchInfo);
  return (
    <div className="search">
      <div className="wrapper">
        <div className="container">
          {dataMovie
            .filter((movie) => movie.title.toLowerCase().includes(searchInfo))
            .map((movie, i) => (
              <div className="itemMovie" key={i}>
                <ListItem item={movie._id} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
