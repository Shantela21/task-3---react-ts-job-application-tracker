import './App.css'
import { Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import JobPage from './pages/JobPage'
import Home from './pages/Dashboard'
import Dashboard from './pages/Dashboard'

function App() {
 

  return (
    <>
     <Routes>
         <Route path='/' element={<LandingPage/>} />
         <Route path='/Login' element={<Login/>} />
         <Route path='/GetStarted' element={<Register/>} />
         <Route path='/Dashboard' element={<Dashboard/>} />
     </Routes>
    </>
  )
}

export default App
