import React, { useState } from "react";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddJob = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in first.");
      return;
    }

    if (!title || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const job = { title, description };

    try {
      // Get the user first
      const res = await fetch(`http://localhost:5000/users/${userId}`);
      const user = await res.json();

      // Add job to user's applications array
      user.applications.push(job);

      // Save back to db.json
      await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applications: user.applications }),
      });

      alert("Job added!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Add a Job</h2>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={handleAddJob}>Add Job</button>
    </div>
  );
}
