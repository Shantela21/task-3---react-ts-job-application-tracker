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
    <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
      <button
        onClick={handleBackToLogin}
        style={{
          padding: "5px 10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          background: "lightgray",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "5px 10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          background: "lightgray",
          cursor: "pointer"
        }}
      >
        Back
      </button>
    </div>
  );
}
