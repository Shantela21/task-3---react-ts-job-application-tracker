import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    // Clear user session data
    localStorage.removeItem('userId');
    // Navigate to login page
    navigate('/');
  };

  return (
    <button
      onClick={handleBackToLogin}
      style={{
        margin: "10px",
        padding: "5px 10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        background: "lightgray",
        cursor: "pointer"
      }}
    >
      Back
    </button>
  );
}
