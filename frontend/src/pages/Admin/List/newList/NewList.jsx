import React, { useEffect, useState } from 'react';
import "./NewList.scss";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../../redux/slice/movieSlice';
import { createList } from '../../../../redux/slice/listSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from "react-router-dom";


const NewList = () => {

    const [list, setList] = useState(null);

    const show = useSelector((state) => state.movie.show);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const handleChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });
    }

    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setList({ ...list, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createList(list))
    }

    return (
        <>
            <div className="back">
                <Link to="/admin/list">
                    <Button>
                        <KeyboardBackspaceIcon />
                        <span>Trở về</span>
                    </Button>
                </Link>
            </div>
            <section className='newListContainer'>
                <div className='newList'>
                    <div className="newListTitle"><h1>Danh sách phim mới</h1></div>
                    <form className="newListForm">
                        <div className="addNewList">
                            <label>Tên</label>
                            <input
                                type="text"
                                id='title'
                                name='title'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addNewList">
                            <label>Kiểu</label>
                            <select name='type' id='type' className='type' onChange={handleChange} >
                                <option value="movie">Movie</option>
                                <option value="series">Series</option>
                            </select>
                        </div>
                        <div className="addNewList">
                            <label>Thể loại</label>
                            <input
                                type="text"
                                id='genre'
                                name='genre'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addNewList">
                            <label>Danh sách phim</label>
                            <select multiple name='content' onChange={handleSelect}>
                                {show.map((movie) => (
                                    <option
                                        key={movie._id}
                                        value={movie._id}
                                    >
                                        {movie.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='btnAddList'>
                            <Button
                                variant="contained"
                                color='success'
                                className='addProductButton'
                                onClick={handleSubmit}
                            >
                                Thêm
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default NewList;