import { Link } from "react-router-dom";

interface Application {
  id: number;
  company: string;
  role: string;
  status: "Rejected" | "Applied" | "Interviewed" | string;
  date: string;
  duties: string;
  requirements: string;
  address: string;
  contact: string;
  extraInfo: string;
}

interface JobCardProps {
  application: Application;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

export default function JobCard({ application, index, onDelete, onEdit }: JobCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Rejected": return "#e74c3c";
      case "Applied": return "#f1c40f";
      case "Interviewed": return "#2ecc71";
      default: return "#bdc3c7";
    }
  };

  const getStatusBadgeStyle = (status: string) => ({
    backgroundColor: getStatusColor(status),
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: "bold",
    display: "inline-block",
    marginBottom: "0.5rem"
  });

  const cardStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "1.5rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer"
  };

  const cardHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)"
  };

  return (
    <div 
      className="job-card" 
      style={cardStyle}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, cardHoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, cardStyle);
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50", fontSize: "1.25rem" }}>
            {application.company}
          </h3>
          <p style={{ margin: "0 0 0.5rem 0", color: "#34495e", fontSize: "1rem", fontWeight: "500" }}>
            {application.role}
          </p>
        </div>
        <span style={getStatusBadgeStyle(application.status)}>
          {application.status}
        </span>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        {application.date && (
          <p style={{ margin: "0 0 0.5rem 0", color: "#7f8c8d", fontSize: "0.875rem" }}>
            <strong>Applied:</strong> {new Date(application.date).toLocaleDateString()}
          </p>
        )}
        {application.address && (
          <p style={{ margin: "0 0 0.5rem 0", color: "#7f8c8d", fontSize: "0.875rem" }}>
            <strong>Location:</strong> {application.address}
          </p>
        )}
        {application.contact && (
          <p style={{ margin: "0 0 0.5rem 0", color: "#7f8c8d", fontSize: "0.875rem" }}>
            <strong>Contact:</strong> {application.contact}
          </p>
        )}
      </div>

      {application.duties && (
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ margin: "0 0 0.25rem 0", fontWeight: "600", color: "#2c3e50", fontSize: "0.875rem" }}>
            Key Duties:
          </p>
          <p style={{ margin: "0", color: "#7f8c8d", fontSize: "0.875rem", lineHeight: "1.4" }}>
            {application.duties.length > 100 
              ? `${application.duties.substring(0, 100)}...` 
              : application.duties
            }
          </p>
        </div>
      )}

      {application.requirements && (
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ margin: "0 0 0.25rem 0", fontWeight: "600", color: "#2c3e50", fontSize: "0.875rem" }}>
            Requirements:
          </p>
          <p style={{ margin: "0", color: "#7f8c8d", fontSize: "0.875rem", lineHeight: "1.4" }}>
            {application.requirements.length > 100 
              ? `${application.requirements.substring(0, 100)}...` 
              : application.requirements
            }
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
        <Link 
          to={`/job/${application.id}`}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: "500",
            transition: "background-color 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#2980b9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#3498db";
          }}
        >
          View Details
        </Link>
        
        <button 
          onClick={() => onEdit(index)}
          style={{
            backgroundColor: "#f39c12",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e67e22";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f39c12";
          }}
        >
          Edit
        </button>
        
        <button 
          onClick={() => onDelete(index)}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#c0392b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#e74c3c";
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
