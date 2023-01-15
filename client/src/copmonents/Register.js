import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App';

function Register() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
    navigate(`/${user.username}`)
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

export default Register
