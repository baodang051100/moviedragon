import React, { useEffect, useState } from 'react';
import { getAll } from '../../../redux/slice/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Movie.module.scss";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ShareIcon from '@mui/icons-material/Share';


const Movie = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll())
    }, [])
    const movie = useSelector((state) => state.movie.show);

    const handleClick = (id) => {
        navigate("/vn/watch/" + id)
    }

    return (
        <div className={styles.movieData}>
            <div>
                <h1>All Movie</h1>
            </div>
            <div className={styles.movieCard}>
                {movie.map((item) => {
                    return (
                        <div className={styles.movieItem} key={item._id}>
                            <div className={styles.movieImage}>
                                <img
                                    src={item.imgSm}
                                    alt={item.imgSm}
                                    onClick={() => handleClick(item._id)}
                                />
                                <ul className={styles.movieAction}>
                                    <li>
                                        <ShareIcon />
                                        <span>Share</span>
                                    </li>
                                    <li>
                                        <FavoriteIcon />
                                        <span>Favorite</span>
                                    </li>
                                    <li>
                                        <PlaylistAddIcon />
                                        <span>Add Playlist</span>
                                    </li>
                                </ul>
                                <div className={styles.watchMovie} onClick={() => handleClick(item._id)}>
                                    <PlayCircleFilledIcon />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Movie;