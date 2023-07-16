import axios from "axios";
import React, { useEffect, useState } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./ListItem.scss";
import ShareIcon from "@mui/icons-material/Share";
import { addMyList } from "../../../redux/slice/myListSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ListItem = ({ item }) => {
  const userId = localStorage.getItem("userId");
  const [movie, setMovie] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    axiosInstance
      .get("movie/find/" + item, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((res) => {
        setMovie(res.data);
      });
  }, []);

  const onClickAddMyList = () => {
    const list = {
      movieId: movie._id,
      movieImg: movie.imgSm,
      movieTitle: movie.title,
      movieDesc: movie.desc,
    };
    dispatch(addMyList(list));
  };

  const handleClick = (id) => {
    navigate({ pathname: "/vn/watch/" + id });
  };

  return (
    <div className="listCard">
      <div className="listImage">
        <img src={movie.imgSm} alt="" />
        <ul className="listAction">
          <li>
            <ShareIcon />
            <span>Chia sẻ</span>
          </li>
          <li onClick={onClickAddMyList}>
            <PlaylistAddIcon />
            <span>Thêm vào danh sách</span>
          </li>
        </ul>
        <div className="listWatch" onClick={() => handleClick(movie._id)}>
          <PlayCircleFilledIcon />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
