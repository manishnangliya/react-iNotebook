import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:""})
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    // so page don't reload on submit form
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createruser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5ZTA3OGNhNTEyOGE3MjU1OGVkNWMyIn0sImlhdCI6MTY1NDUyMzc4OH0.tzD8jhikN-Zk8ArT6PqH_d7am2aqO24qZRrg-xtAnus"
      },
      body: JSON.stringify({ name,email,password })
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully","success");
    }
    else {
      props.showAlert("Invalid Credentials","danger");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className='container my-5'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' minLength={3}  required onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} required aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password"  minLength={5} required onChange={onChange} name='password' />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" minLength={5} required onChange={onChange} name='cpassword' />
        </div>
        <button type="submit"   className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
