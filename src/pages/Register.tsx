import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
export default function Register() {
  // State for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Simulate successful registration
    setMessage(`Welcome, ${username}! Registration successful.`);

    // Reset form
    setUsername('');
    setPassword('');
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

          <button type="submit">
            <Link to='/Login'>Submit</Link></button>
        </form>

        {/* Show message */}
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
