import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }

    try {
      // Fetch users from db.json
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      // Check if credentials match
      const userFound = users.find(
        (user: any) => user.username === username && user.password === password
      );

      if (userFound) {
        localStorage.setItem('userId', userFound.id);
        setMessage(`Welcome back, ${username}! Login successful.`);
        setTimeout(() => navigate('/Dashboard'), 1500);
      } else {
        setMessage('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error: Unable to login.');
    }
  };

  return (
    <div className='main-container'>
      <Navbar />
      <BackButton/>
      <div className="container-login">
        <h2
          style={{
            fontWeight: 'bolder',
            color: 'green',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          Login
        </h2>

        <form className="form" onSubmit={handleLogin}>
          <label htmlFor="username" style={{ fontFamily: 'sans-serif' }}>
            Enter your username
          </label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <label htmlFor="password">Enter your password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <button type="submit">Submit</button>
        </form>

        {message && (
          <p style={{ textAlign: 'center', color: 'blue', marginTop: '1rem' }}>
            {message}
          </p>
        )}
      </div>
      <Footer className="fixed" />
    </div>
  );
}
