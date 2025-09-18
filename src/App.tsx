import './App.css'
import { Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
 

  return (
    <>
     <Routes>
         <Route path='/' element={<LandingPage/>} />
         <Route path='/Login' element={<Login/>} />
         <Route path='/GetStarted' element={<Register/>} />
     </Routes>
    </>
  )
}

export default App
