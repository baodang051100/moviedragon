import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import "./UserList.scss";
import { Button } from '@mui/material';
import NewUser from '../newUser/NewUser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser } from '../../../../redux/slice/userSlice';
import { getAllShow } from '../../../../redux/slice/userSlice';

const UserList = () => {
    const dispatch = useDispatch();
    //GET USER
    useEffect(() => {
        dispatch(getUser());
    }, []);
    const showUser = useSelector((state) => state.user.show)

    //DELETE USER
    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    }

    return (
        <div className='userList'>
            <div className='table-userList-container'>
                <table>
                    <caption>List User</caption>
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Tên người dùng</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                        {showUser.map((user, i) => {
                            return (
                                <tr key={user._id}>
                                    <td data-cell="STT">{i}</td>
                                    <td data-cell="UserName" className='username'>{user.username}</td>
                                    <td data-cell="Email" className='email'>{user.email}</td>
                                    <td data-cell="Admin" className='isAdmin'>
                                        {user.isAdmin ?
                                            <CheckIcon style={{ color: 'green' }} /> :
                                            <CloseIcon style={{ color: 'red' }} />
                                        }
                                    </td>
                                    <td data-cell="Img" className='imgUser'>
                                        <img
                                            src={(user.profilePic) !== "" ?
                                                (user.profilePic) :
                                                (imgUser)}
                                            alt={user.profilePic}
                                        />
                                    </td>
                                    <td data-cell="Action" className='action'>
                                        <Link to={{ pathname: "/admin/users/" + user._id, user }}>
                                            <Button
                                                className='btnAction'
                                                variant='contained'
                                                color='primary'
                                            >
                                                Sửa
                                            </Button>
                                        </Link>
                                        <Button
                                            className='btnAction'
                                            onClick={() => handleDelete(user._id)}
                                            variant='contained'
                                            color='error'
                                        >
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList;