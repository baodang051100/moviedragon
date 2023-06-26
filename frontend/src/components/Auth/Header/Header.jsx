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
import { updateSearch } from '../../../redux/slice/searchSlice';
import ClearIcon from '@mui/icons-material/Clear';
import Darkmode from '../../Darkmode/Darkmode';

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const users = useSelector((state) => state.auth.user);

    //SEARCH
    const [showSearch, setShowSearch] = useState(false);
    const handleSearch = () => setShowSearch(!showSearch);

    const [searchInfo, setSearchInfo] = useSelector((state) => state.search.searchInfo);
    const [isSearch, setIsSearch] = useState(false);

    const dispatchs = useDispatch();
    const toogleSearch = () => {
        setIsSearch(!isSearch);
    }
    const clearSearchField = () => {
        setIsSearch(!isSearch);
        dispatchs(updateSearch(""))
    }
    const searchText = useSelector(state => state.search.searchInfo)

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
                                Đăng nhập
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                variant="contained"
                                color='error'
                                size='medium'
                                className='btn-signin'
                            >
                                Đăng ký
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
                        <div className={click ? 'navbar-moblie' : 'navbar-left-item'}>
                            <ul >
                                <li><Link to="/vn">Trang chủ</Link></li>
                                {/* <li><Link to="/vn/movies">Movie</Link></li>
                                <li><Link to="/vn/series">Series</Link></li> */}
                                <li><Link to="/vn/mylist">Danh sách xem sau</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="loginSuccess">
                        {/*SEARCH*/}
                        <div className="searchBox">
                            <div className="searchbar">
                                <Link to="/vn/search">
                                    <input
                                        type="text"
                                        className={showSearch ? "input active" : "input"}
                                        placeholder='Phim, diễn viên, thể loại...'
                                        value={searchText}
                                        onChange={(e) => dispatchs(updateSearch(e.target.value))}
                                    />
                                </Link>
                                <button
                                    className={showSearch ? "btn active" : "btn"}
                                    type='submit'
                                    onClick={handleSearch}
                                >
                                    {searchText === "" ?
                                        (<Link to="/vn/search"><SearchIcon className="searchBtn" /></Link>)
                                        : (<ClearIcon onClick={clearSearchField} className="searchBtn" />)
                                    }
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
                                <div className="dropdown-profile-item">
                                    {user.isAdmin ?
                                        <Link to="/admin/">
                                            <span>Admin</span>
                                        </Link> : ""
                                    }
                                    <Link to="/admin/user">
                                        <span>Thông tin</span>
                                    </Link>
                                </div>
                                <Button
                                    variant="outline"
                                    size='medium'
                                    className='btn-logout'
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
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