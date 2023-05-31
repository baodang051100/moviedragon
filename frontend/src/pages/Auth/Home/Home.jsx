import React, { useState } from 'react';
import "./Home.scss";
import Button from '@mui/material/Button';
import Showcase from '../../../components/Auth/Showcase/Showcase';
import image from "../../../assets/homepageImage.jpg";
import { imageDevice } from '../../../slide-data';
import background from "../../../assets/background.jpg"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    return (
        <div className='home'>
            <div className="homeTop">
                <Showcase />
                <img src={image} alt="" />
            </div>
            <div className="secondContainer">
                <div className="secondContent">
                    <h1>Stream Anywhere</h1>
                    <span>
                        Flicks is available for free on Android, IOS,
                        Roku, Apple TV, Amazone Fir TV, Xfinity X1Xbox,
                        Samsung Smart TV, Sony Smart TV, Play Station and the web.
                    </span>
                </div>
                <div className="imgDevice">
                    {imageDevice.map((index, i) => {
                        return (
                            <img src={index.image} key={i} />
                        )
                    })}
                </div>
                <div className="btnSP">
                    <Button variant='contined'>Supported Device</Button>
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