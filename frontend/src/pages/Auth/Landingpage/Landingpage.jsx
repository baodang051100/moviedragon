import React, { useEffect, useState } from 'react';
import "./Landingpage.scss";
import Movie from '../Movie/Movie';
import Slider from '../../../components/Auth/Slider/Slider';
import Fearture from "../../../components/Auth/Fearture/Fearture";
import List from '../list/List';
import axios from 'axios';
import ListItem from '../ListItem/ListItem';

const Landingpage = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/lists${type ? "?type=" + type : ""} ${genre ? "&genre=" + genre : ""}`
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