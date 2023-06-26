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
                        <h2>Thousands Title</h2>
                        <span>
                            Watch amazing movies and TV shows for free. No Subscription fees,
                            and no credit cards. Just thousands of hours of streaming video content
                            from studios like Paramount, Lionstage, MGM and more
                        </span>
                        <div className="contentButton">
                            <Button variant='contained'>Browser Title</Button>
                        </div>
                    </div>
                </div>
                <img src={background} alt="" />
            </div>
            <div className="homeBottom">
                <div className="bottomContent">
                    <h1>Get an account today</h1>
                    <span>
                        Access free content on all of your device, sync your list and
                        continue watching anywhere.
                    </span>
                    <Link to="/register"><Button variant='contained'>Register Free</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Home;