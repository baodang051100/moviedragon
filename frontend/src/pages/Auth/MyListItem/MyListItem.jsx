import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Loader from "../../../components/Loader/Loader";
import axios from "axios";
import "./MyListItem.scss";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const MyListItem = ({ item, deleteMovie }) => {
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    axiosInstance
      .get("myList/get/" + item, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((res) => {
        setMovieList(res.data);
      });
  }, []);

  const handleClick = (id) => {
    navigate({ pathname: "/vn/watch/" + id });
  };

  return (
    <div className="myListCard">
      <div className="myListImage">
        <img src={movieList.movieImg} alt="" />
        <div
          className="myListWatch"
          onClick={() => handleClick(movieList.movieId)}
        >
          <PlayCircleFilledIcon />
        </div>
      </div>
      <Button
        onClick={() => deleteMovie(item)}
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
      >
        Xóa
      </Button>
    </div>
  );
};

export default MyListItem;
