import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Register() {
  return (
    <div>
          <Navbar/>
        <div className='container-login'>
          <h2 style={{fontWeight:"bolder", color:"green",fontFamily:"sans-serif",marginLeft:"40%", marginBottom:"10%"}} >Register</h2>
          <form className='form' >
            <label htmlFor="fname" >Enter your username</label>
            <br />
            <input type="text" id="fname" name="fname" />
            <br />
            <label htmlFor="lname">Enter your password</label>
            <br />
            <input type="text" id="lname" name="lname" />
            <br />
            <br />
            <button>
             submit
            </button>
          </form>
        </div>
        <Footer/>
        </div>
  )
}
