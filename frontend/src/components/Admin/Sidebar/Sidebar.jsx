import React, { useState } from 'react';
import "./Sidebar.scss";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from 'react-router-dom';

const menuItems = [
    { name: "Trang Chủ", link: "vn", icon: <HomeIcon /> },
    { name: "User", link: "admin/user", icon: <PersonIcon /> },
    { name: "Phim", link: "admin/movie", icon: <PlayCircleIcon /> },
    { name: "Danh sách phim", link: "admin/list", icon: <FormatListBulletedIcon /> },
]

const SidebarAdmin = () => {
    const { collapseSidebar } = useProSidebar();
    return (
        <div className='sidebar' style={{ height: "100vh", display: "flex", flexDirection: 'row' }}>
            <Sidebar style={{ height: "100vh" }}>
                <Menu>
                    <MenuItem icon={<MenuIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                    />
                    {menuItems.map((items, id) => {
                        return (
                            <Link to={{ pathname: "/" + items.link }} key={id}>
                                <MenuItem
                                    icon={items.icon}
                                >
                                    <h2>{items.name}</h2>
                                </MenuItem>
                            </Link>
                        )
                    })}
                </Menu>
            </Sidebar>
        </div>
    );
}

export default SidebarAdmin;