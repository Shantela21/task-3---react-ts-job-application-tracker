<<<<<<< HEAD
import React from 'react'

export default function Login() {
  return (
    <div>
      
    </div>
  )
=======
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; 

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
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      const userFound = users.find(
        (user: any) => user.username === username && user.password === password
      );

      if (userFound) {
        setMessage(`Welcome back, ${username}! Login successful.`);
        console.log("User ID:", userFound.id); // ✅ This will now show in console
        // Navigate to Home after successful login
        setTimeout(() => navigate('/Dashboard'), 1000); 
      } else {
        setMessage('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error: Unable to login.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-login">
        <h2 style={{ fontWeight: 'bolder', color: 'green', fontFamily: 'sans-serif', textAlign: 'center' }}>
          Login
        </h2>

        <form className="form" onSubmit={handleLogin}>
          <label htmlFor="username">Enter your username</label><br />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />

          <label htmlFor="password">Enter your password</label><br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br /><br />

          <button type="submit">Submit</button>
        </form>

        {message && <p style={{ textAlign: 'center', color: 'blue', marginTop: '1rem' }}>{message}</p>}
      </div>
      <Footer />
    </div>
  );
>>>>>>> dev
}
