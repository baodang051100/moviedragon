import React, { useEffect } from 'react'
import "./movieList.scss";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, getAll } from '../../../../redux/slice/movieSlice';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const dispatch = useDispatch();
    //GET MOVIE
    useEffect(() => {
        dispatch(getAll());
    }, []);
    const show = useSelector((state) => state.movie.show);

    //DELETE MOVIE
    const handleDelete = (id) => {
        dispatch(deleteMovie(id))
    }


    return (
        <div className='movieList'>
            <div className='table-movieList-container'>
                <div className="btnAdd">
                    <Link to="/admin/newMovie">
                        <Button
                            variant='contained'
                            color='success'
                        >
                            Create Movie
                        </Button>
                    </Link>
                </div>
                <table>
                    <caption>List Movie</caption>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Desc</th>
                            <th>Genre</th>
                            <th>Img</th>
                            <th>Series</th>
                            <th>Year</th>
                            <th>Action</th>
                        </tr>
                        {show.map((movie, i) => {
                            return (
                                <tr key={i}>
                                    <td data-cell="Title">{movie.title}</td>
                                    <td data-cell="Desc" className='desc'>{movie.desc}</td>
                                    <td data-cell="Genre">{movie.genre}</td>
                                    <td data-cell="Img" className='img'>
                                        <img src={movie.imgSm} alt={movie.imgSm} width={50} height={50} />
                                    </td>
                                    <td data-cell="isSeries" className='isSeries'>
                                        {movie.isSeries ?
                                            <CheckIcon style={{ color: 'green' }} /> :
                                            <CloseIcon style={{ color: 'red' }} />
                                        }
                                    </td>
                                    <td data-cell="Year">{movie.year}</td>
                                    <td data-cell="Action">
                                        <Button
                                            onClick={() => handleDelete(movie._id)}
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

export default MovieList;