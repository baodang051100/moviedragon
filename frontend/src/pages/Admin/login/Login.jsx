import React, { useContext, useState } from 'react';
import "./Login.scss";
import { Button } from '@mui/material';
import { login } from '../../../../context/authContext/apiCall';
import { AuthContext } from '../../../../context/authContext/AuthContext';

const LoginAdmin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isFetching, dispatch } = useContext(AuthContext);

    const handle = (e) => {
        e.preventDefault();
        login({ email, password }, dispatch);
    }

    return (
        <div className='login'>
            <form className="loginForm">
                <input
                    type="text"
                    placeholder='email'
                    className="loginInput"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='password'
                    className="loginInput"
                    onChange={(e) => setPassword(e.target.value)} />
                <Button
                    variant="contained"
                    color='success'
                    className="loginButton"
                    sx={{ padding: "0.5rem" }}
                    onClick={handle}
                    disabled={isFetching}
                >
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginAdmin;