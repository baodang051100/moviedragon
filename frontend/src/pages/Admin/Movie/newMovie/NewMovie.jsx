import React, { useContext, useState } from 'react';
import "./NewMovie.scss";
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { storage } from '../../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { createMovie } from '../../../../redux/slice/movieSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from "react-router-dom";

const NewProduct = () => {

    const [movie, setMovie] = useState(null);
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const dispatch = useDispatch();


    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    }

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
                    toast.error("Add Product Failed!" + error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setMovie((prev) => {
                            return { ...prev, [item.label]: url };
                        });
                        setUploaded((prev) => prev + 1)
                    });
                    toast.success("Add Product Successfully!");
                }
            )
        });
    }

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: img, label: "img" },
            { file: imgTitle, label: "imgTitle" },
            { file: imgSm, label: "imgSm" },
            { file: trailer, label: "trailer" },
            { file: video, label: "video" },
        ]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(movie);
        console.log("Bearer" + JSON.parse(localStorage.getItem("token")))
        dispatch(createMovie(movie)).then(() => {
            toast.success("Add Movie Success");
        })
    }

    return (
        <div>
            <div className="back">
                <Link to="/admin/movie">
                    <Button>
                        <KeyboardBackspaceIcon />
                        <span>Trở về</span>
                    </Button>
                </Link>
            </div>
            <div className="newMovieContainer">
                <div className='addMovie'>
                    <div className="addMovieTitle">
                        <h1>Thêm Phim Mới</h1>
                    </div>
                    <form className="addProductForm" onSubmit={handleSubmit}>
                        <div className="formItem">
                            <div className="formLeft">
                                <div className="addMovieBox">
                                    <label>Tên phim</label>
                                    <input type="text" placeholder='Tên' name='title' onChange={handleChange} />
                                </div>
                                <div className="addMovieBox">
                                    <label>Mô tả</label>
                                    <input type="text" placeholder='Mô tả' name='desc' onChange={handleChange} />
                                </div>
                                <div className="addMovieBox">
                                    <label>Năm</label>
                                    <input type="text" placeholder='Năm' name='year' onChange={handleChange} />
                                </div>
                                <div className="addMovieBox">
                                    <label>Thể loại</label>
                                    <select id="genre" name='genre' onChange={handleChange}>
                                        <option>Please select genre ....</option>
                                        <option value="Action">Action</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Comedy">Comedy</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Fantasy">Fantasy</option>
                                        <option value="Detective">Detective</option>
                                        <option value="Horror">Horror</option>
                                        <option value="Musicals">Musicals</option>
                                        <option value="Romance">Romance</option>
                                        <option value="Mystery">Mystery</option>
                                        <option value="ScienceFiction">Science Fiction</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Thriller">Thriller</option>
                                        <option value="Western">Western</option>
                                    </select>
                                </div>
                                <div className="addMovieBox">
                                    <label>Số tập</label>
                                    <input type="text" placeholder='Số tập' name='limit' onChange={handleChange} />
                                </div>
                                <div className="addMovieBox">
                                    <label>Series</label>
                                    <select name="isSeries" id="isSeries" onChange={handleChange}>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className="formRight">
                                <div className="addMovieBox">
                                    <label>Hình ảnh</label>
                                    <input
                                        type="file"
                                        id='img'
                                        name='img'
                                        onChange={e => setImg(e.target.files[0])}
                                    />
                                </div>
                                <div className="addMovieBox">
                                    <label>Hình ảnh tiêu đề</label>
                                    <input
                                        type="file"
                                        id='imgTitle'
                                        name='imgTitle'
                                        onChange={e => setImgTitle(e.target.files[0])}
                                    />
                                </div>
                                <div className="addMovieBox">
                                    <label>Hình ảnh thu nhỏ</label>
                                    <input
                                        type="file"
                                        id='imgSm'
                                        name='imgSm'
                                        onChange={e => setImgSm(e.target.files[0])}
                                    />
                                </div>
                                <div className="addMovieBox">
                                    <label>Trailer</label>
                                    <input
                                        type="file"
                                        name='trailer'
                                        onChange={e => setTrailer(e.target.files[0])}
                                    />
                                </div>
                                <div className="addMovieBox">
                                    <label>Video</label>
                                    <input
                                        type="file"
                                        name='video'
                                        onChange={e => setVideo(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </div>
                        {uploaded === 5 ? (
                            <div className='activeButton'>
                                <Button
                                    variant="contained"
                                    color='success'
                                    className='addProductButton'
                                    onClick={handleSubmit}
                                    type='submit'
                                >
                                    Thêm
                                </Button>
                                <label style={{ color: "green" }}>Tải lên thành công!</label>
                            </div>
                        ) : (
                            <div className='activeButton'>
                                <Button
                                    variant="contained"
                                    color='primary'
                                    className='addProductButton'
                                    onClick={handleUpload}
                                >
                                    Tải lên
                                </Button>
                                <label style={{ color: "red" }}>Tải lên chưa hoàn thành!</label>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProduct;