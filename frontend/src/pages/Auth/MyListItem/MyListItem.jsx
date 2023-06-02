import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMovieFromMyList } from '../../../redux/slice/myListSlice';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import Loader from '../../../components/Loader/Loader';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const MyListItem = ({ item }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [movieList, setMovieList] = useState([]);

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    });
    useEffect(() => {
        axiosInstance.get("myList/get/" + item, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
        }).then((res) => {
            setMovieList(res.data)
        })
    }, [])

    const deleteMovie = async (id) => {
        if (window.confirm("You Want To Delete Movie From Your List ?")) {
            dispatch(deleteMovieFromMyList(id));
            window.location.reload(false)
            navigate("/vn")
        }
    }

    const loading = useSelector(state => state.myList.loading);
    const info = useSelector(state => state.myList.info);
    const handleClick = () => { }
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="myListCard">
                    <div className="myListImage">
                        <img src={movieList.movieImg} alt="" />
                        <h1>{movieList.movieTitle}</h1>
                        <div className="myListWatch" onClick={() => handleClick(item._id)}>
                            <PlayCircleFilledIcon />
                        </div>
                        <button onClick={() => deleteMovie(item)}>Delete</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default MyListItem