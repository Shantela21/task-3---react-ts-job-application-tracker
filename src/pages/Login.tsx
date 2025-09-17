import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='container-login'>
      <h2 >Login</h2>
      <form className='form'>
        <label htmlFor="fname">Enter your username</label>
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
  );
}

