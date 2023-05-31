import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "./Movie.scss";
import axios from 'axios';
import { Button, Modal, Box, Typography } from '@mui/material';
import { updateMovieById } from '../../../../../../context/movieContext/apiCalls';
import { MoviesContext } from '../../../../../../context/movieContext/MovieContext';
import { toast } from 'react-toastify';
import { storage } from '../../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import SidebarAdmin from '../../../../components/Admin/Sidebar/Sidebar';

const MovieAdmin = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [movie, setMovie] = useState([]);
    const [updateTrailer, setUpdateTrailer] = useState(null);
    const [updateVideo, setUpdateVideo] = useState(null);
    const [updateImgSm, setUpdateImgSm] = useState(null);
    const [updateImgTitle, setUpdateImgTitle] = useState(null);
    const [updateImg, setUpdateImg] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const { dispatch } = useContext(MoviesContext);

    const { id } = useParams();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/movie/find/" + id, {
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
            },
        }).then((res) => {
            console.log(res.data);
            setMovie(res.data);
        })
    }, []);

    const upload = (items) => {
        items.forEach(async (item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const storageRef = ref(storage, `productImage/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    toast.error("Update Movie Failed!" + error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setMovie((prev) => {
                            return { ...prev, [item.label]: url };
                        });
                        setUploaded((prev) => prev + 1)
                    });
                    toast.success("Update Movie Successfully!");
                }
            )
        });
    }



    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: updateImg, label: "img" },
            { file: updateImgTitle, label: "imgTitle" },
            { file: updateImgSm, label: "imgSm" },
            { file: updateTrailer, label: "trailer" },
            { file: updateVideo, label: "video" },
        ]);
    }

    const handleInput = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    }

    const handleSubmit = () => {
        updateMovieById(id, movie, dispatch)
    }

    return (
        <>
            <div className="movieAdmin">
            <SidebarAdmin />
                <div className="movieTitleContainer">
                    <h1 className="movieTitle">Movie</h1>
                    <div className="button">
                        <Link to="/admin/addMovie">
                            <Button
                                variant='contained'
                                color='success'
                                className="movieAddButton"
                            >
                                Create
                            </Button>
                        </Link>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleOpen}
                            className="movieAddButton"
                        >
                            Update
                        </Button>
                    </div>
                </div>
                <div className="movieTop">
                    <div className="movieTopRight">
                        <div className="movieInfoTop">
                            <img src={movie.imgSm} alt="" className="movieInfoImg" />
                            <span className="movieName">{movie.title}</span>
                        </div>
                        <div className="movieInfoBottom">
                            <div className="movieInfoItem">
                                <span className="movieInfoKey">id:</span>
                                <span className="movieInfoValue">{movie._id}</span>
                            </div>
                            <div className="movieInfoItem">
                                <span className="movieInfoKey">Description:</span>
                                <span className="movieInfoValue">{movie.desc}</span>
                            </div>
                            <div className="movieInfoItem">
                                <span className="movieInfoKey">Genre:</span>
                                <span className="movieInfoValue">{movie.genre}</span>
                            </div>
                            <div className="movieInfoItem">
                                <span className="movieInfoKey">Year:</span>
                                <span className="movieInfoValue">{movie.year}</span>
                            </div>
                            <div className="movieInfoItem">
                                <span className="movieInfoKey">Limit:</span>
                                <span className="movieInfoValue">{movie.limit}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="movieBottom">
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <h1>Update Movie</h1>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <form className="movieForm" onSubmit={handleSubmit}>
                                    <div className="movieFormLeft">
                                        <label>Movie Title</label>
                                        <input type="text" placeholder={movie.title} name='title' onChange={handleInput} value={movie.title} />
                                        <label>Desc</label>
                                        <input type="text" placeholder={movie.desc} name='desc' onChange={handleInput} value={movie.desc} />
                                        <label>Year</label>
                                        <input type="text" placeholder={movie.year} name='year' onChange={handleInput} value={movie.year} />
                                        <label>Genre</label>
                                        <input type="text" placeholder={movie.genre} name='genre' onChange={handleInput} value={movie.genre} />
                                        <label>Limit</label>
                                        <input type="text" placeholder={movie.limit} name='limit' onChange={handleInput} value={movie.limit} />
                                        <label>isSeries</label>
                                        <select name='isSeries' id='isSeries' onChange={handleInput}>
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>
                                    <div className="movieFormRight">
                                        <div className="movieUpload">
                                            <label>Trailer</label>
                                            <input type="file" placeholder={movie.trailer} name='trailer' onChange={e => setUpdateTrailer(e.target.files[0])} />
                                            <label>Video</label>
                                            <input type="file" placeholder={movie.video} name='video' onChange={e => setUpdateVideo(e.target.files[0])} />
                                            <label>Image</label>
                                            <input type="file" id="file" name='img' onChange={e => setUpdateImg(e.target.files[0])} />
                                            <label>Title Image</label>
                                            <input type="file" id="file" name='imgTitle' onChange={e => setUpdateImgTitle(e.target.files[0])} />
                                            <label>Thumbnail Image</label>
                                            <input type="file" id="file" name='imgSm' onChange={e => setUpdateImgSm(e.target.files[0])} />
                                        </div>
                                    </div>
                                </form>
                                {uploaded === 5 ? (
                                    <div className="active">
                                        <Button
                                            variant='contained'
                                            color='success'
                                            className='movieButton'
                                            onClick={handleSubmit}
                                        >
                                            Update
                                        </Button>
                                        <label style={{ color: "green" }}>Update Done!</label>
                                    </div>
                                ) : (
                                    <div className="activeButton">
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            className='movieButton'
                                            onClick={handleUpload}
                                        >
                                            Upload
                                        </Button>
                                        <label style={{ color: "red" }}>Updating Not Finished yet!</label>
                                    </div>
                                )}
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default MovieAdmin;