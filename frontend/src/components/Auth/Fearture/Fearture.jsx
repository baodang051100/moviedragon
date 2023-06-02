import React, { useEffect, useState } from 'react'
import Slider from '../Slider/Slider'
import { useDispatch } from 'react-redux';
import { getMovieRandom } from '../../../redux/slice/movieSlice';
import "./Fearture.scss"

const Fearture = ({ type, setGenre }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieRandom(type));
    }, [type])

    return (
        <div className='fearture'>
            <div className="slider">
                <Slider />
            </div>
            <div className="fill">
                {type && (
                    <div className="category">
                        <span>{type === "movie" ? "Movies" : "Series"}</span>
                        <select
                            name="genre"
                            id="genre"
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <option>Genre</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historical">Historical</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-fi</option>
                            <option value="thriller">Thriller</option>
                            <option value="western">Western</option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentary</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Fearture