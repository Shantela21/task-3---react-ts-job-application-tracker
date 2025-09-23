import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
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
