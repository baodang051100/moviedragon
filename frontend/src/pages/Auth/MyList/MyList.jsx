import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./MyList.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getAnUser } from '../../../redux/slice/userSlice';
import MyListItem from '../MyListItem/MyListItem';
import Loader from '../../../components/Loader/Loader';

const MyList = () => {
    const id = JSON.parse(localStorage.getItem("userId"));
    const dispatch = useDispatch();

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    });

    const loading = useSelector(state => state.user.loading);

    useEffect(() => {
        dispatch(getAnUser(id))
    }, []);

    const infoUser = useSelector(state => state.user.info);
    const [getWatchList, setGetWatchList] = useState(infoUser?.watchlists);

    useEffect(() => {
        setGetWatchList(infoUser?.watchlists)
    }, [infoUser])

    return (
        <div>
            <div className="myList">
                <div className="myListTitle">
                    <h1>My List</h1>
                </div>
                <div className="myListWrapper">
                    <div className="myListContainer">
                        {getWatchList?.map((item, i) => {
                            return (
                                <MyListItem key={i} item={item} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyList;