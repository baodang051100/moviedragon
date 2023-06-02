import React, { useState } from 'react';
import "./Header.scss";
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slice/authSlice';
import { profile_items, notification_items } from '../data-headers';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    //SEARCH
    const [showSearch, setShowSearch] = useState(false);
    const handleSearch = () => setShowSearch(!showSearch);

    //NOTIFICATIONS
    const [showHover, setShowHover] = useState(false);
    const handleMouserEnter = () => setShowHover(true);
    const handleMouserLeave = () => setShowHover(false);

    const [click, setClick] = useState(false);

    //PROFILES
    const [isShow, setIsShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    };

    return (
        <header>
            {user === null ? (
                <nav className='navbar'>
                    <div className="navbar-left">
                        <div className="logo">
                            <Link to="/">
                                <h1>MovieDragon</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-right">
                        <Link to="/login">
                            <Button
                                variant="contained"
                                color='primary'
                                size='medium'
                                className='btn-signin'
                            >
                                Sign in
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                variant="contained"
                                color='error'
                                size='medium'
                                className='btn-signin'
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </nav>
            ) : (
                <nav className='navbar'>
                    <div className="navbar-left">
                        <div className="logo">
                            <Link to="/vn">
                                <h1>MovieDragon</h1>
                            </Link>
                        </div>
                        <div className="navbarToggle">
                            <Button
                                onClick={() => setClick(!click)}
                                className="btnMenu"
                            >
                                <span>Menu</span>
                                {click ? <CloseIcon /> : <MenuIcon />}
                            </Button>
                        </div>
                        <div className= {click ? 'navbar-moblie' : 'navbar-left-item'}>
                            <ul >
                                <li><Link to="/vn">Home</Link></li>
                                <li><Link to="/vn/movies">Movie</Link></li>
                                <li><Link to="/vn/series">Series</Link></li>
                                <li><Link to="/vn/mylist">My List</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="loginSuccess">
                        {/*SEARCH*/}
                        <div className="searchBox">
                            <div className="searchbar">
                                <input
                                    type="text"
                                    className={showSearch ? "input active" : "input"}
                                    placeholder='Phim, diễn viên, thể loại...'
                                />
                                <button
                                    className={showSearch ? "btn active" : "btn"}
                                    type='submit'
                                    onClick={handleSearch}
                                >
                                    <SearchIcon />
                                </button>
                            </div>
                        </div>
                        {/*NOTIFICATION*/}
                        <div className='notifi'>
                            <div className="icon"
                                onMouseEnter={handleMouserEnter}
                                onMouseLeave={handleMouserLeave}
                            >
                                <NotificationsIcon sx={{ width: "2rem", height: "2rem" }} />
                            </div>
                            {showHover && (
                                <div className="dropdown-notifications">
                                    {notification_items.map((items, index) => {
                                        return (
                                            <div className="dropdown-content" key={index}>
                                                <img src={items.img} alt="" />
                                                <div className="dropdown-info">
                                                    <div className="note">
                                                        {items.icon}
                                                        <span>{items.note}</span>
                                                    </div>
                                                    <div className="name">
                                                        <span>{items.name}</span>
                                                    </div>
                                                    <div className="time">
                                                        <span>{items.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                        {/*PROFILE*/}
                        <div className="imgUser">
                            <img
                                src={user.profilePic}
                                alt=""
                                onClick={() => setIsShow(!isShow)}
                            />
                        </div>
                        {isShow && (
                            <div className='dropdown-profile'>
                                {profile_items.map((items, index) => {
                                    return (
                                        <div className='dropdown-item-profile' key={index}>
                                            <div className="options">
                                                <Link to={{ pathname: `/${items.name}` }}>
                                                    {items.icon}
                                                    <span>{items.title}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                                <Button
                                    variant="outline"
                                    size='medium'
                                    className='btn-logout'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        )}
                        {isShow ?
                            <ArrowDropUpIcon
                                sx={{ width: "2rem", height: "2rem" }}
                            /> :
                            <ArrowDropDownIcon
                                sx={{ width: "2rem", height: "2rem" }}
                            />
                        }
                    </div>
                </nav>
            )}
        </header>
    )
}

export default Header;