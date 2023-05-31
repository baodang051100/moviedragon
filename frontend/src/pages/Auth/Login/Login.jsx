import React, { useState } from 'react';
import styles from "./Login.module.scss";
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../redux/slice/authSlice';
import { toast } from 'react-toastify';

const Login = () => {

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const { email, password } = form;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { success, isLoading } = useSelector((state) => state.auth)

    const onChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password,
        }
        dispatch(login(userData)).then(() => {
            if (localStorage.getItem("user") !== null) {
                toast.success(`Logged in as ${userData.email}`)
                navigate(`/vn`)
            } else {
                toast.error(`Logged in as ${userData.email}`);
            }
        })
            .catch(toast.error)
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <section className={styles.container}>
            <div className={styles.login}>
                <div className={styles.title}><h1>Login</h1></div>
                <form onSubmit={onSubmit}>
                    <div className={styles.inputBox}>
                        <label htmlFor="" className={styles.userLabel}>Email</label>
                        <input
                            type="text"
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            className={styles.userInput}
                            placeholder='Enter your email...'
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="" className={styles.userLabel}>Password</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            className={styles.userInput}
                            placeholder='Enter your password...'
                        />
                    </div>
                    <div className={styles.btnLogin}>
                        <Button
                            variant='contained'
                            color='success'
                            className={styles.btn}
                            disabled={isLoading}
                            type='submit'
                        >
                            Sign In
                        </Button>
                        <div className={styles.links}>
                            <span>Do you already have an account?</span>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login