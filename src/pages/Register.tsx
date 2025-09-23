import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // Required fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Optional fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  // Others
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/users";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!username || !email || !password || !confirmPassword) {
      setMessage("Please fill in all required fields.");
      return;
    }
    if (!email.includes("@")) {
      setMessage("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Prepare user data
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
      avatar: avatar ? avatar.name : "", // Storing filename only for now
      applications: [],
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      setLoading(false);

      if (response.ok) {
        const newUser = await response.json();
        setMessage(`Welcome, ${newUser.username}! Registration successful.`);
        localStorage.setItem("userId", newUser.id);
        setTimeout(() => navigate("/Login"), 1500);
      } else {
        setMessage("Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <BackButton />
      <div className="container-login">
        <h2 style={{ fontWeight: "bolder", color: "green", textAlign: "center" }}>
          Register
        </h2>

        <form className="form" onSubmit={handleSubmit}>
          {/* Required Fields */}
           <label>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <label>Username *</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>Email *</label>
          <input className="register-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password *</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label>Confirm Password *</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Optional Fields */}
         

          <label>Phone</label>
          <input className="register-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

          

          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

          <label>Date of Birth</label>
          <input className="register-input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

          <label>Gender</label>
          <select className="register-input" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Submit */}
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Submit"}
          </button>
        </form>

        {message && (
          <p style={{ textAlign: "center", color: "blue", marginTop: "1rem" }}>{message}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
