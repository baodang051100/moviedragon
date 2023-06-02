import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import "./ListItem.scss"
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addMyList } from '../../../redux/slice/myListSlice';
import { useDispatch } from 'react-redux';

const ListItem = ({ item }) => {
    const userId = localStorage.getItem("userId")
    const [movie, setMovie] = useState([]);
    const dispatch = useDispatch();
    
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    });
    useEffect(() => {
        axiosInstance.get("movie/find/" + item, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
        }).then((res) => {
            setMovie(res.data)
        })
    }, [])

    const onClickAddMyList = () => {
        const list = {
            movieId: movie._id,
            movieImg: movie.imgSm,
            movieTitle: movie.title,
            movieDesc: movie.desc
        }
        console.log(list)
        dispatch(addMyList(list))
    }

    const handleClick = () => { }
    return (
        <div className="listCard">
            <div className="listImage">
                <img src={movie.imgSm} alt="" />
                <ul className="listAction">
                    <li>
                        <ShareIcon />
                        <span>Share</span>
                    </li>
                    <li>
                        <FavoriteIcon onClick={onClickAddMyList} />
                        <span>Favoriter</span>
                    </li>
                    <li>
                        <PlaylistAddIcon />
                        <span>Add Playlist</span>
                    </li>
                </ul>
                <div className="listWatch" onClick={() => handleClick(item._id)}>
                    <PlayCircleFilledIcon />
                </div>
            </div>
        </div>
    )
}

export default ListItem;