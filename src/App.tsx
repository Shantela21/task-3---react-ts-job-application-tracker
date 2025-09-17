import './App.css'
import { Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'

function App() {
 

  return (
    <>
     <Routes>
         <Route path='/' element={<LandingPage/>} />
         <Route path='/Login' element={<Login/>} />
     </Routes>
    </>
  )
}

export default App
