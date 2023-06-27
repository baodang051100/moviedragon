import React, { useState } from 'react';
import "./Home.scss";
import Button from '@mui/material/Button';
import Showcase from '../../../components/Auth/Showcase/Showcase';
import image from "../../../assets/homepageImage.jpg";
import { imageDevice } from '../../../slide-data';
import background from "../../../assets/background.jpg"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from '../../../components/Auth';

const Home = () => {
    return (
        <div className='home'>
            <Header />
            <div className="homeTop">
                <Showcase />
                <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
            </div>
            <div className="secondContainer">
                <div className="secondContent">
                    <h1>Bất cứ nơi đâu</h1>
                    <span>
                        Có sẵn miễn phí trên Android, IOS, Roku, Apple TV, Amazon Fire TV, hộp Xfinity X1, Samsung Smart TV, Sony Smart TV, Play Station và Web.
                    </span>
                </div>
                <div className="imgDevice">
                    {imageDevice.map((index, i) => {
                        return (
                            <img src={index.image} key={i} />
                        )
                    })}
                </div>
            </div>
            <div className="thirdContainer">
                <div className="thirdContent">
                    <div className="content">
                        <h2>Hàng ngàn tiêu đề</h2>
                        <span>
                            Xem phim và chương trình truyền hình tuyệt vời miễn phí. Không có phí đăng ký và không có thẻ tín dụng.
                            Chỉ hàng nghìn giờ phát trực tuyến nội dung video từ các hãng phim như Paramount, Lionsgate, MGM,...
                        </span>
                        <div className="contentButton">
                            <Link to="/login">
                                <Button variant='contained'>Xem Thêm</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <img src={background} alt="" />
            </div>
            <div className="homeBottom">
                <div className="bottomContent">
                    <h1>Nhận tài khoản ngay hôm nay</h1>
                    <span>
                        Truy cập nội dung miễn phí trên tất cả thiết bị của bạn, đồng bộ hóa danh sách của bạn và tiếp tục xem ở bất cứ đâu.
                    </span>
                    <Link to="/register"><Button variant='contained'>Đăng ký miễn phí</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Home;