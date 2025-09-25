import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/users";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setMessage("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const userData = {
      username,
      email,
      password,
      fullName,
      phone,
      address,
      dob,
      gender,
      bio,
      applications: [], // empty at first
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const newUser = await res.json();
        localStorage.setItem("userId", newUser.id); // store user ID for later
        setMessage(`Welcome, ${newUser.username}! Registration successful.`);
        setTimeout(() => navigate("/Login"), 1500);
      } else {
        setMessage("Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error.");
    }
  };

  return (
    <div>
      <Navbar />
      <BackButton />
      <div className="container-login h2" >
      <h2  style={{
            fontWeight: 'bolder',
            color: 'green',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }} >Register</h2>
      <form className="form " onSubmit={handleSubmit}>
        <input  className="register-input" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input   className="register-input"  placeholder="Username *" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="register-input"  placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password *" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="Confirm Password *" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button className="register-btn " type="submit">Submit</button>
      </form>
      {message && <p style={{ textAlign: 'center', color: 'blue', marginTop: '1rem' }}>{message}</p>}
      </div>
      <Footer />
    </div>
  );
}
