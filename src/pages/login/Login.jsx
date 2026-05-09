import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const firstpage = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
};

const buttonStyle = {
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: '#007bff', // Background color
    color: 'white', // Text color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const user = await login(dispatch, { username, password });

            if (user?.isAdmin) {
                navigate("/");
            } else {
                alert("You are not an admin user.");
            }
        } catch (err) {
            alert("Login failed. Please check your username and password.");
        }
    };

    return (
        <div style={firstpage}>
            <input
                style={{ padding: '10px', marginBottom: '20px' }}
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                style={{ padding: '10px', marginBottom: '20px' }}
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button style={buttonStyle} onClick={handleClick}>
                Login
            </button>
        </div>
    );
};

export default Login;
