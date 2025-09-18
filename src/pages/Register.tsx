import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
     
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage(`Welcome, ${username}! Registration successful.`);
        setUsername('');
        setPassword('');
      } else {
        setMessage('Error: Could not register user.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error: Unable to register.');
    }
  };

  return (
    <div>
      <Navbar />
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
           <button type="submit">Submit</button></Link>
          
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
