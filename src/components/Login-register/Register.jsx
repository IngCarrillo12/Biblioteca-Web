import React, { useContext, useState } from 'react'
import { AuthContext } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "./auth.css"
export const Register = () => {
  const {signUp} = useContext(AuthContext)
  const [user, setUser] = useState({firstName: "", lastName:"" ,email:"", password:"", photoURL:""})
  const navigate = useNavigate()
  const handleChange = (e)=>{
    const {name, value} = e.target
    setUser({
      ...user,
      [name]:value,
      photoURL:'https://firebasestorage.googleapis.com/v0/b/biblioteca-web-b6900.appspot.com/o/image%2Ffoto-default.webp?alt=media&token=e4328136-16ab-4a06-8662-b8593cf959ab'
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const resultSignUp = await signUp(user)
    if(resultSignUp)navigate("/")  
  }
  return (
    <>
   <div className='container center'>
    <div className="form-container">
      <p className="title">Sign Up</p>
      <form action="" onSubmit={handleSubmit} className='form'>
      <div className='form_group'>
        <label htmlFor="firstName">FirstName:</label>
        <input onChange={handleChange} type="text" name='firstName' className="input" placeholder="Juan" required/>
        </div>
        <div className='form_group'>
        <label htmlFor="lastName">LastName:</label>
        <input onChange={handleChange} type="text" name='lastName' className="input" placeholder="Gonzales" required/>
        </div>
        <div className='form_group'>
        <label htmlFor="email">Email:</label>
        <input onChange={handleChange} type="email" name='email' className="input" placeholder="YourEmail@company.com"/>
        </div>
        <div className='form_group'>
        <label htmlFor="password">Password:</label>
        <input onChange={handleChange} type="password" name='password' className="input" placeholder="*******"/>
        </div>
        <button className="form-btn" type='submit'>Sign Up</button>
        </form>
      <p className="sign-up-label">
      Do you already have an account?<Link to={"/login"} className="sign-up-link">Log In</Link>
      </p>
      </div>
      </div>
    </>
  )
}
