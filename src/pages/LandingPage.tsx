import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'

export default function LandingPage() {
  return (
    <div>
      <Navbar/>
      <div className='landingPage'>
        <h1 style={{display:"flex",
          padding:"20px", paddingLeft:"18%",marginTop:"3%"
        }}>Streamline Your Job Hunt and Never Miss a Step</h1>
        <p  style={{fontWeight:"500",color:"grey",  display:"flex", justifyContent:"center",marginTop:"1%"}}>Take control of your career journey today-stay focused, stay organized, <br/>and move one step closer to landing the job you’ve been working hard for.</p> <br/>
         <button className='container-btn1' style={{backgroundColor:"black", color:"white", position:"absolute",left:"35%",marginTop: "15px"}}>Start Tracking Jobs
    </button>
    <button className='container-btn3' style={{position:"absolute",backgroundColor:"black",color: "white",
  fontSize: "16px",
  cursor: "pointer",
  right: "35%",
  borderRadius: "5px",
  fontWeight:"bold",
  marginTop: "15px"}}>Login To Your Account
    </button>
    <h2 style={{display:"flex",justifyContent:"center", margin:"10%",marginTop: "8%",fontWeight:"bold"}}>Your Career. Your Control.</h2>
    <p style={{fontWeight:"500",color:"grey",  display:"flex", justifyContent:"center",marginTop:"-8%"}}>With everything from applications to interview dates in one place, you’ll never miss a deadline and can focus on what really matters—getting hired.</p>
      </div>
      
      <Footer/>
    </div>
  )
}
