import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./MyList.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getAnUser } from '../../../redux/slice/userSlice';
import MyListItem from '../MyListItem/MyListItem';
import { deleteMovieFromMyList } from '../../../redux/slice/myListSlice';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader/Loader';

const MyList = () => {
    const id = JSON.parse(localStorage.getItem("userId"));
    const dispatch = useDispatch();

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    });

    const [infoUser, setInfoUser] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const getAnUser = async () => {
            try {
                const res = await axiosInstance.get("users/" + id, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                    },
                });
                setInfoUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAnUser();
    }, [getAnUser]);

    const deleteMovie = async (id) => {
        if (window.confirm("You Want To Delete Movie From Your List ?")) {
            dispatch(deleteMovieFromMyList(id));
            window.location.reload();
        }
    };

    return (
        <div className="myList">
            <div className="myListTitle">
                <h1>My List</h1>
            </div>
            <div className="myListWrapper">
                <div className="myListContainer">
                    {infoUser.watchlists?.map((item, i) => {
                        return (
                            <MyListItem key={i} item={item} deleteMovie={deleteMovie} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyList;