import React, { useEffect, useState } from 'react';
import styles from "./ListDetails.module.scss";
import SidebarAdmin from '../../../../components/Admin/Sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateList } from '../../../../redux/slice/listSlice';
import axios from 'axios';
import { Button } from '@mui/material';

const ListDetails = () => {
    const [listDetail, setListDetail] = useState([]);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const show = useSelector((state) => state.movie.show);
    useEffect(() => {
        axios.get("http://localhost:8000/api/list/find/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
        }).then((res) => {
            setListDetail(res.data);
        })
    },[])


    const handleChangeInput = (e) => {
        const value = e.target.value;
        setListDetail({ ...listDetail, [e.target.name]: value });
    }

    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setListDetail({ ...listDetail, [e.target.name]: value });
    };

    const handleSubmit = () => {
        dispatch(updateList(id, Object.keys(listDetail)))
        console.log(typeof(listDetail))
    }
    return (
        <div className={styles.listDetails}>
            <SidebarAdmin />
            <div className={styles.container}>
                <div className={styles.details}>
                    <form action="">
                        <h1>List Details</h1>
                        <div className={styles.listInfo}>
                            <label htmlFor="">Id:</label>
                            <span>{listDetail._id}</span>
                        </div>
                        <div className={styles.listInfo}>
                            <label htmlFor="">Type:</label>
                            <span>{listDetail.type}</span>
                        </div>
                        <div className={styles.listInfo}>
                            <label htmlFor="">Genre:</label>
                            <span>{listDetail.genre}</span>
                        </div>
                        <div className={styles.listInfo}>
                            <label htmlFor="">Content:</label>
                            {listDetail.content?.map((content, id) => {
                                return (
                                    <span key={id} className={styles.content} style={{ display: "block" }}>
                                        {content}
                                    </span>
                                )
                            })}
                        </div>
                    </form>
                </div>
                <div className={styles.update}>
                    <form action="">
                        <h1>Update List</h1>
                        <label htmlFor="">Type</label>
                        <input type='text' placeholder={listDetail.type} name='type' onChange={handleChangeInput} value={listDetail.type} />
                        <label htmlFor="">Genre</label>
                        <input type='text' placeholder={listDetail.genre} name='genre' onChange={handleChangeInput} value={listDetail.genre} />
                        <div className={styles.listInfo}>
                            <label htmlFor="">Content</label>
                            <input type="text" value={listDetail.content} />
                            <select name="content" id="content" onChange={handleSelect} multiple>
                                {show.map((list, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={list._id}
                                        >
                                            {list.title}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <Button
                            variant='contained'
                            color='primary'
                            className={styles.btnUpdate}
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default ListDetails