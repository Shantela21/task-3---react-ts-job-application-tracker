import React from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>

      <Navbar/>
      <div className="landingPage">
        <h1 className="landing-heading">
          Streamline Your Job Hunt and Never Miss a Step
        </h1>

        <p className="landing-subtext">
          Take control of your career journey today—stay focused, stay organized, <br/>
          and move one step closer to landing the job you’ve been working hard for.
        </p>

        <div className="landing-buttons">
          <Link to="/GetStarted">
          <button className="btn-primary">Start Tracking Jobs</button></Link>
          
          <Link to="/Login">
           <button className="btn-secondary">Login To Your Account 
             
          </button></Link>
         
        </div>

        <h2 className="section-heading">
          Your Career. Your Control.
        </h2>

        <p className="section-subtext">
          With everything from applications to interview dates in one place, you’ll never miss a deadline 
          and can focus on what really matters—getting hired.
        </p>
      </div>
      <Footer/>

    </div>
  )
}
