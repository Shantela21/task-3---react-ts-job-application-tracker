# Job Application Tracker (React + TypeScript)

This is a **Job Application Tracker** built with **React, TypeScript, Vite**, and **React Router**. The application helps users register, log in, view job listings, and manage their dashboard in a clean and simple interface.

---

## Features

- **Landing Page**: Introduction to the application.  
- **Login & Registration**: Authentication pages for users.  
- **Dashboard**: Manage job applications and view details.  
- **Job Page**: Browse job listings.  
- **404 Page**: Handles undefined routes with a friendly error page.  
- **Routing**: Client-side routing using React Router.  
- **JSON Server**: Mock backend for testing and data storage.  

---

## Tech Stack

- **Frontend**: React, TypeScript, Vite  
- **Routing**: React Router v7  
- **Styling**: CSS  
- **Backend (Mock)**: JSON Server  
- **Utilities**: React Toastify for notifications  

---

## Installation & Setup  

Follow these steps to set up the project locally:


# Clone the repository
```bash
git clone https://github.com/Shantela21/task-3---react-ts-job-application-tracker.git
```
# Navigate to the project folder
```bash
cd task-3---react-ts-job-application-tracker
```
# Install dependencies
```bash
npm install
```
# Start the development server
```bash
npm run dev
````

## Running JSON Server

The project uses **JSON Server** to simulate a backend. Start it with:

```bash
npx json-server --watch db.json --port 5000
```

Make sure to create a `db.json` file in the root folder with sample data, for example:

```json
{
  "jobs": [
    { "id": 1, "title": "Frontend Developer", "company": "Tech Corp" },
    { "id": 2, "title": "Backend Engineer", "company": "Code Labs" }
  ]
}
```

---

## Available Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the development server      |
| `npm run build`   | Build the project for production  |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint for code quality check |

---

## Project Structure

```
task-3---react-ts-job-application-tracker
│
├── public            # Static assets
├── src
│   ├── pages         # LandingPage, Login, Register, Dashboard, JobPage, NotFound
│   ├── App.tsx       # Main App component with routing
│   ├── App.css       # Global styles
│   └── main.tsx      # Entry point
│
├── db.json           # Mock database for JSON Server
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

---

## Dependencies

* **react**: UI Library
* **react-router-dom**: Routing
* **json-server**: Mock API Server
* **react-toastify**: Notifications

Dev dependencies include **TypeScript**, **Vite**, **ESLint**, and related plugins.

---

## Future Improvements

* Add authentication with JWT
* Implement persistent storage with a real database
* Enhance UI with a design library like Tailwind or Material-UI

---

## Author
Shantela Noyila



