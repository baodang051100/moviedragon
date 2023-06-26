import React, { useEffect, useState } from 'react';
import "./Landingpage.scss";
import List from '../list/List';
import axios from 'axios';
import Fearture from '../../../components/Auth/Fearture/Fearture';
import { Header } from '../../../components/Auth';

const Landingpage = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    });
    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axiosInstance.get(`lists${type ? "?type=" + type : ""} ${genre ? "&genre=" + genre : ""}`
                    , {
                        headers: {
                            token: "Bearer " + JSON.parse(localStorage.getItem("token")),
                        }
                    });
                setLists(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getList();
    }, [type, genre])

    return (
        <div className="landingPage">
            <div className="feartured"><Fearture type={type} setGenre={setGenre} /></div>
            <div className="listMovie">
                {lists.map((list) => {
                    return (
                        <List key={list._id} list={list} />
                    )
                })}
            </div>
        </div>
    )
}

export default Landingpage;