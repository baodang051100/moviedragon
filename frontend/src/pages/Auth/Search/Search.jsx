import React, { useEffect, useMemo, useState } from 'react';
import axios from "axios";
import ListItem from '../ListItem/ListItem';
import "./Search.scss";
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';

const Search = () => {
    const [dataMovie, setDataMovie] = useState([]);
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    });
    useEffect(() => {
        const getSearch = async () => {
            try {
                const res = await axiosInstance.get("movie/find/", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                    },
                });
                setDataMovie(res.data);
            } catch (err) {
                setDataMovie("");
            }
        }
        getSearch();
    });

    const [selectedCategory, setSelectedCategory] = useState();
    const handleCategoryChange = (e) => [
        setSelectedCategory(e.targer.value)
    ]
    const getFilteredList = () => {
        if(!selectedCategory) {
            return dataMovie;
        }
        return dataMovie.filter((item) => item.genre === selectedCategory);
    }
    var filteredList = useMemo(getFilteredList, [selectedCategory, dataMovie]);

    const searchInfo = useSelector(state => state.search.searchInfo)
    return (
        <div className='search'>
            <div className="wrapper">
                <div className="container" >
                    {dataMovie.filter(movie => movie.title.toLowerCase().includes(searchInfo)).map((movie, i) => (
                        <div className='itemMovie' key={i}><ListItem item={movie._id} /></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;