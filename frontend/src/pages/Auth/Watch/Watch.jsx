import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "./Watch.module.scss";

const Watch = () => {
    const { id } = useParams();
    const [watchMovie, setWatchMovie] = useState([]);

    const showMovie = useSelector((state) => state.movie.show);

    useEffect(() => {
        axios.get("http://localhost:8000/api/movie/find/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
        }).then((res) => {
            setWatchMovie(res.data)
        })
    }, [])
    return (
        <div className={styles.watch}>
            <div className={styles.video}>
                <video controls>
                    <source src={watchMovie.video} />
                </video>
            </div>
            <div className={styles.videoInfo}>
                <h1 className={styles.title}>Name: {watchMovie.title}</h1>
                <h2>Introduce</h2>
                <span className={styles.content}><h3>Content:</h3> {watchMovie.desc}</span>
                <span className={styles.year}><h3>Year:</h3> {watchMovie.year}</span>
                <span className={styles.genre}><h3>Genre:</h3> {watchMovie.genre}</span>
            </div>
        </div>
    )
}

export default Watch