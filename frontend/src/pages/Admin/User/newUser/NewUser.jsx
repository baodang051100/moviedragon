import React, { useState, useContext } from 'react';
import "./NewUser.scss";
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { storage } from '../../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { register } from '../../../../../../context/authContext/apiCall';
import { AuthContext } from '../../../../../../context/authContext/AuthContext';

const NewUser = () => {
    const [user, setUser] = useState(null);
    // const [email, setEmail] = useState(null);
    // const [userName, setUserName] = useState(null);
    // const [password, setPassword] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    // const [isAdmin, setIsAdmin] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const { dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value })
    }

    const upload = async (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const storageRef = ref(storage, `userImage/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    toast.error("Add User Failed!" + error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setUser((prev) => {
                            return { ...prev, [item.label]: url };
                        });
                        setUploaded((prev) => prev + 1)
                    });
                    toast.success("Add User Successfully!");
                }
            )
        });
    }
    console.log(user);

    const handleUpload = (e) => {
        e.preventDefault();
        upload([{ file: profilePic, label: "img" }]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(user, dispatch);
    }

    return (
        <div className='register'>
            <h1 className="addUserTitle">New User</h1>
            <form className="registerForm">
                <div className="addUser">
                    <label>UserName</label>
                    <input
                        type="text"
                        placeholder='UserName'
                        name='username'
                        className="registerInput"
                        onChange={handleChange}
                    />
                </div>
                <div className="addUser">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder='email'
                        name='email'
                        className="registerInput"
                        onChange={handleChange}
                    />
                </div>
                <div className="addUser">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder='password'
                        name='password'
                        className="registerInput"
                        onChange={handleChange}
                    />
                </div>
                <div className="addUser">
                    <label>ProfilePic</label>
                    <input
                        type="file"
                        id='profilePic'
                        name='profilePic'
                        className="registerInput"
                        onChange={e => setProfilePic(e.target.files[0])}
                    />
                </div>
                <div className="addUser">
                    <label>isAdmin</label>
                    <select name="isAdmin" id="isAdmin" onChange={handleChange}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>

                {uploaded === 1 ? (
                    <div className="activeButton">
                        <Button
                            variant="contained"
                            color='success'
                            className="registerButton"
                            sx={{ padding: "0.5rem" }}
                            onClick={handleSubmit}
                        >
                            Upload User
                        </Button>
                        <label style={{ color: "green" }}>Done Register!</label>
                    </div>
                ) : (
                    <div className="activeButton">
                        <Button
                            variant="contained"
                            color='primary'
                            className="registerButton"
                            sx={{ padding: "0.5rem" }}
                            onClick={handleUpload}
                        >
                            Register
                        </Button>
                        <label style={{ color: "red" }}>Register Not Finished yet!</label>
                    </div>
                )}
            </form>
        </div>
    )
}

export default NewUser