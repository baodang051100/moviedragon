import React from 'react';
import "./Topbar.scss";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import logo from "../../assets/netflix_logo.jpg";
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const Topbar = () => {
    const user = sessionStorage.getItem("user");
    console.log(user)
    const navigate = useNavigate();

    const handleLogout = () => {
        // remove the token and user from the session storage
        sessionStorage.removeItem('user');
        navigate("/admin/login")
    }

    return (
        <div className='topbar'>
            <div className="logo">
                {/* <MenuIcon className='menuIcon'
                    sx={{ fontSize: '30px', padding: '1rem'}}
                /> */}
                <img src={logo} alt='' className='logo' />
            </div>
            <div className="search">
                <div className="searchBox">
                    <input type='text' placeholder='Search' />
                    <SearchIcon
                        sx={{ fontSize: "30px" }}
                        className='searchIcon'
                    />
                </div>
            </div>
            <div className="right">
                <Link to="/admin/login">
                    <Button variant="outlined" color='primary'>
                        <PersonIcon />
                        LOGIN
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Topbar;