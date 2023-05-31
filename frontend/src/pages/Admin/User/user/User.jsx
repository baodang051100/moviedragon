import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "./User.scss";
import axios from 'axios';
import PublishIcon from '@mui/icons-material/Publish';
import { Button, Modal, Box, Typography } from '@mui/material';
import SidebarAdmin from '../../../../components/Admin/Sidebar/Sidebar';

const User = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [user, setUser] = useState([]);

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
        axios.get("http://localhost:8000/api/user/find/" + id, {
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
            },
        }).then((res) => {
            console.log(res.data);
            setUser(res.data);
        })
    }, []);

    return (
        <div className="user">
            <SidebarAdmin />
            <div className="userTitleContainer">
                <h1 className="userTitle">User</h1>
                <div className="button">
                    <Link to="/admin/addUser">
                        <Button
                            variant='contained'
                            color='success'
                            className="userAddButton"
                        >
                            Create
                        </Button>
                    </Link>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleOpen}
                        className="userAddButton"
                    >
                        Update
                    </Button>
                </div>
            </div>
            <div className="userTop">
                <div className="userTopRight">
                    <div className="userInfoTop">
                        <img src={user.profilePic} alt="" className="userInfoImg" />
                        <span className="userName">{user.username}</span>
                    </div>
                    <div className="userInfoBottom">
                        <div className="userInfoItem">
                            <span className="userInfoKey">id:</span>
                            <span className="userInfoValue">{user._id}</span>
                        </div>
                        <div className="userInfoItem">
                            <span className="userInfoKey">Email:</span>
                            <span className="userInfoValue">{user.email}</span>
                        </div>
                        <div className="userInfoItem">
                            <span className="userInfoKey">Password:</span>
                            <span className="userInfoValue">{user.password}</span>
                        </div>
                        <div className="userInfoItem">
                            <span className="userInfoKey">isAdmin:</span>
                            <span className="userInfoValue">{user.isAdmin}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="userBottom">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <label className='userFormTitle'>User Title</label>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <form className="userForm">
                                <div className="userFormLeft">
                                    <label>Username</label>
                                    <input type="text" placeholder={user.username} />
                                    <label>Email</label>
                                    <input type="text" placeholder={user.email} />
                                    <label>Password</label>
                                    <input type="text" placeholder={user.password} />
                                    <label>isAdmin</label>
                                    <select>
                                        <option value={user.isAdmin}>{user.isAdmin}</option>
                                        <option value="false">No</option>
                                        <option value="true">false</option>
                                    </select>
                                </div>
                                <div className="userFormRight">
                                    <div className="userUpload">
                                        <img
                                            src={user.profilePic}
                                            alt=""
                                            className="userUploadImg"
                                        />
                                        <label for="file">
                                            <PublishIcon />
                                        </label>
                                        <input type="file" id="file" style={{ display: "none" }} />
                                    </div>
                                </div>
                            </form>
                            <Button
                                variant='contained'
                                color='primary'
                                className='userButton'
                            >
                                Update
                            </Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default User;