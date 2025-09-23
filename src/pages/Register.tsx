import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import BackButton from '../components/BackButton';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/users';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      // Add new user to db.json
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          applications: [] // store jobs added by this user
        })
      });

      if (response.ok) {
        const newUser = await response.json();
        setMessage(`Welcome, ${newUser.username}! Registration successful.`);

        // Store userId in localStorage for later use (e.g., adding jobs)
        localStorage.setItem('userId', newUser.id);

        // Redirect to login page after 1 second
        setTimeout(() => navigate('/Login'), 1000);
      } else {
        setMessage('Registration failed. Try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('An error occurred. Please try again.');
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <Navbar />
      <BackButton/>
      <div className="container-login">
        <h2
          style={{
            fontWeight: 'bolder',
            color: 'green',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            marginBottom: '10%',
          }}
        >
          Register
        </h2>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Enter your username</label>
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
          <Link to="/Login">
          <button type="submit"  style={{color:"black", width:"100%"}}>Submit</button></Link>
        </form>

        {message && (
          <p style={{ textAlign: 'center', color: 'blue', marginTop: '1rem' }}>
            {message}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
