import React, { useState } from 'react';
import styles from "./Register.module.scss";
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../../redux/slice/authSlice';
import { toast } from "react-toastify";
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Register = () => {

    const [form, setForm] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { success, isLoading } = useSelector((state) => state.auth);


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
                        setForm((prev) => {
                            return { ...prev, [item.label]: url };
                        });
                        setUploaded((prev) => prev + 1)
                    });
                    toast.success("Add User Successfully!");
                }
            )
        });
    }
    const handleUpload = (e) => {
        e.preventDefault();
        upload([{ file: profilePic, label: "profilePic" }]);
    }

    const onChange = (e) => {
        const value = e.target.value;
        setForm({ ...form, [e.target.name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register(form)).then(() => {
            toast.success(`Registered new user - ${success}`)
            navigate('/login')
        })
            .catch(toast.error)
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <section className={styles.container}>
            <div className={styles.register}>
                <div className={styles.title}><h1>Đăng ký</h1></div>
                <form onSubmit={onSubmit}>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Tên người dùng</label>
                        <input
                            type="text"
                            placeholder='Vui lòng nhập tên người dùng...'
                            id='username'
                            name='username'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            placeholder='Vui lòng nhập email...'
                            id='email'
                            name='email'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder='Vui lòng nhập mật khẩu...'
                            id='password'
                            name='password'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Ảnh đại diện</label>
                        <input
                            type="file"
                            id='profilePic'
                            name='profilePic'
                            className="registerInput"
                            onChange={e => setProfilePic(e.target.files[0])}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Admin</label>
                        <select name="isAdmin" id="isAdmin" onChange={onChange}>
                            <option value="">Please Choose Options....</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>

                    <div className={styles.btnRegister}>
                        {uploaded === 1 ? (
                            <div className={styles.btnAction}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={styles.btn}
                                    type='submit'
                                    onClick={onSubmit}
                                >
                                    Đăng ký
                                </Button>
                                <label style={{ color: "green" }}>Đăng ký thành công!</label>
                            </div>
                        ) : (
                            <div className={styles.btnAction}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={styles.btn}
                                    onClick={handleUpload}
                                >
                                    Tải lên
                                </Button>
                                <label style={{ color: "red" }}>Đăng ký chưa được thực hiện!</label>
                            </div>
                        )}
                        <div className={styles.links}>
                            <span>Bạn đã có tài khoản?</span>
                            <Link to="/login">Đăng nhập</Link>
                        </div>
                    </div>
                </form>
                <div className={styles.back}>
                    <ArrowBackIcon sx={{ color: "#eee" }} />
                    <Link to="/">
                        Quay về
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Register