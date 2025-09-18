import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
// import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
=======
import { BrowserRouter } from "react-router-dom"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
>>>>>>> dev
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
