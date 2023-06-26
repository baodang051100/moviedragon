import React, { useEffect } from 'react'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList, getAllList } from '../../../../redux/slice/listSlice';
import { Link } from "react-router-dom"
import "./ListMovie.scss";

const ListMovie = () => {
    const dispatch = useDispatch();
    //GET MOVIE
    useEffect(() => {
        dispatch(getAllList());
    }, [dispatch]);
    const showList = useSelector((state) => state.list.show);

    //DELETE MOVIE
    const handleDelete = (id) => {
        dispatch(deleteList(id))
    }


    return (
        <div className='lists'>
            <div className='table-list-container'>
                <div className="btnAdd">
                    <Link to="/admin/newList">
                        <Button
                            variant='contained'
                            color='success'
                        >
                            Create List
                        </Button>
                    </Link>
                </div>
                <table>
                    <caption>
                        <span>List</span>
                    </caption>
                    <tbody>
                        <tr className='table-list-title'>
                            <th>Tiêu đề</th>
                            <th>Thể loại</th>
                            <th>Kiểu</th>
                            <th>Hành động</th>
                        </tr>
                        {showList.map((list, i) => {
                            return (
                                <tr key={i}>
                                    <td data-cell="Title">{list.title}</td>
                                    <td data-cell="Genre">{list.genre}</td>
                                    <td data-cell="Type">{list.type}</td>
                                    <td data-cell="Action">
                                        <Button
                                            onClick={() => handleDelete(list._id)}
                                            className='btnDelete'
                                            variant='contained'
                                            color='error'
                                        >
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListMovie;