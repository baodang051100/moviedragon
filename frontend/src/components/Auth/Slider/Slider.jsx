import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../redux/slice/movieSlice";
import "./Slider.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { EffectFlip, Pagination, Navigation, Autoplay } from "swiper";

import Button from '@mui/material/Button';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from "react-router-dom";
import { addMyList } from "../../../redux/slice/myListSlice";

const Slider = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAll());
    }, [])
    const movie = useSelector((state) => state.movie.show);
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate("/vn/watch/" + id)
    }

    const onClickAddMyList = (list) => {
        dispatch(addMyList(list))
    }

    return (
        <div className="container">
            <div className="slider">
                <Swiper
                    effect={"flip"}
                    grabCursor={true}
                    pagination={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        clickable: true
                    }}
                    modules={[EffectFlip, Pagination, Navigation, Autoplay]}
                    loop={true}
                    className="mySwiper"
                >
                    {movie.map((index, i) => {
                        const list = {
                            movieId: index._id,
                            movieTitle: index.title,
                            movieDesc: index.desc
                        }
                        return (
                            <SwiperSlide key={i}>
                                <div className="slideContent">
                                    <h2>{index.title}</h2>
                                    <div className="itemContent">
                                        <p className="genre">{index.genre}</p>
                                        <p className="year">{index.year}</p>
                                        <p>{index.limit}</p>
                                    </div>
                                    <div className="buttons">
                                        <div className="watch" onClick={() => handleClick(index._id)}>
                                            <Button
                                                variant="contained"
                                                color="error"
                                            >
                                                <PlayArrowIcon />
                                                <span>Play</span>
                                            </Button>
                                        </div>
                                        <div className="watchLater">
                                            <Button
                                                variant="outline"
                                                onClick={() => onClickAddMyList(list)}
                                            >
                                                <PlaylistAddIcon />
                                                <span>Add to watch later</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="desc"><span>{index.desc}</span></div>
                                </div>
                                <img src={index.imgSm} alt="" />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div >
    )
}

export default Slider