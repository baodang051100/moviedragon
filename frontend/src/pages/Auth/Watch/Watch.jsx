import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styles from "./Watch.module.scss";
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
import ReactPlayer from 'react-player'

const Watch = () => {
    const { id } = useParams();
    const [watchMovie, setWatchMovie] = useState([]);

    const showMovie = useSelector((state) => state.movie.show);

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    });

    useEffect(() => {
        axiosInstance.get("movie/find/" + id, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "HEAD, POST, OPTIONS",
                "Access-Control-Max-Age": "1000",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
                Vary: "Origin",
                token: "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
        }).then((res) => {
            setWatchMovie(res.data)
        })
    }, [])

    return (
        <div className={styles.watchMovie}>
            <div className={styles.back}>
                <Link to="/vn">
                    <KeyboardBackspaceIcon />
                    <h3>Back</h3>
                </Link>
            </div>
            <div className={styles.watch}>
                <div className={styles.video}>
                    <iframe width="100%" height="100%" src={watchMovie.video}></iframe>
                </div>
                <div className={styles.videoInfo}>
                    <h1 className={styles.title}>{watchMovie.title}</h1>
                    <div className={styles.category}>
                        <span className={styles.genre}>{watchMovie.genre}</span>
                        <span className={styles.year}>{watchMovie.year}</span>
                    </div>
                    <span className={styles.content}>{watchMovie.desc}</span>
                </div>
            </div>
        </div>
    )
}

export default Watch