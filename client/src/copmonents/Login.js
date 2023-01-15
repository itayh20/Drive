import React from 'react'
import { useState } from 'react';
import App from '../App';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const res = await fetch('http://localhost:8000/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json();
        if (data) {
            navigate(`/${user.username}`);
        }
        else {
            alert('User not found');
        }


    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <label>
                    username:
                    <input type='text' name='username' onChange={handleInput} />
                </label>
                <label>
                    password:
                    <input type='password' name='password' onChange={handleInput} />
                </label>
                <button type='submit'>div</button>
            </form>
        </div>
    )
}

export default Login;
