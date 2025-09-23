import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="text-6xl font-bold text-red-500 mb-4" style={{fontWeight:"bolder", fontSize:"800%", marginTop:"10%"}}><strong>404</strong></h1>

      <h2 className="text-2xl font-semibold mb-2" style={{fontWeight:"bolder", fontSize:"150%",color:"black", margin:"20px",marginTop:"8%"}}>I don't know who you are...I don't know what you want</h2>

      <p className="text-gray-600 mb-6" style={{fontWeight:"bolder", fontSize:"300%",color:"black", 
      }}>
     BUT I WILL LOOK FOR YOU.
      </p>
      <p className="404" style={{fontWeight:"bolder", fontSize:"150%",color:"grey", margin:"20px"}}>NO seriously, it seems you may or may not have mistyped a URL, or found an out-of-date link or search results. Trust me, this is not the guy you are looking for.</p>

      <Link
        to="/"
        className="go-home"
      style={{fontWeight:"bolder", fontSize:"300%", color:"lightblue", marginTop:"5%"}}>
        Go Home
      </Link>
    </div>
  );
}
