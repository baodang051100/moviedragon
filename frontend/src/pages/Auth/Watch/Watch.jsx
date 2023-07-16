import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./Watch.module.scss";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Watch = () => {
  const { id } = useParams();
  const [watchMovie, setWatchMovie] = useState([]);

  const showMovie = useSelector((state) => state.movie.show);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    axiosInstance
      .get("movie/find/" + id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "HEAD, POST, OPTIONS",
          "Access-Control-Max-Age": "1000",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-Requested-With",
          Vary: "Origin",
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((res) => {
        setWatchMovie(res.data);
      });
  }, []);
  return (
    <div className={styles.watchMovie}>
      <div className={styles.back}>
        <Link to="/vn">
          <KeyboardBackspaceIcon />
          <h3>Trở về</h3>
        </Link>
      </div>
      <div className={styles.watch}>
        <div className={styles.videoInfo}>
          <div className={styles.image}>
            <img src={watchMovie.imgSm} alt="" />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{watchMovie.title}</h1>
            <div className={styles.category}>
              <div className={styles.genre}>
                <span>{watchMovie.genre}</span>
              </div>
              <div className={styles.year}>
                <span>{watchMovie.year}</span>
              </div>
            </div>
            <span className={styles.desc}>{watchMovie.desc}</span>
          </div>
        </div>
        <div className={styles.video}>
          <iframe width="100%" height="100%" src={watchMovie.video}></iframe>
        </div>
      </div>
    </div>
  );
};

export default Watch;
