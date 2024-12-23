import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import { useState } from 'react';
import { handleError,handleSuccess } from '../utils';

const Register = () => {
  
  const [signUp , setSignUp ] = useState({name:"",email:"",password:"",confirmPassword:""}  );
  const [error,setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); 

  const navigate=useNavigate();

  const handleChange=(e)=>{
        const {name , value}=e.target;
        console.log(name,value);
        
        setSignUp((prev) => ({
          ...prev,            
          [name]: value,     
        }));

      }
  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };


    const handleSignup=async (e)=>{
        e.preventDefault();

        const {name,email,password,confirmPassword} = signUp;
        if(!name || !email || !password || !confirmPassword){
          setError("Name, email, and password are required.");
          return handleError("name,email,password are require");
        }

        if (signUp.password !== signUp.confirmPassword) {
          handleError("Passwords do not match!");
          return;
      }
      if (!termsAccepted) {
      handleError("You must accept the terms and conditions.");
      return;
    }
      
      // handleSuccess("Sign-up successful!");

      try{
        const url = "http://localhost:5000/auth/signup";
            const response =await fetch(url,{
              method:"POST",
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify(signUp)
            })
            const result = await response.json();
            
            const {success,message,error}=result;
            if(success){
              handleSuccess(message);
              setTimeout(()=>{
                console.log('Navigating to login...');
                navigate('/login')
              },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
            
      }catch(err){
            handleError(err);

      }





    }


  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSignup}>
          <div className="form">
            <h1>Sign Up</h1>
            <div className="form-group input-with-icon">
              <i className="fa-solid fa-user"></i>
              <input
                onChange={handleChange}
                type="text"
                name='name'
                className="form-control"
                placeholder="Enter your Name"
                required
                value={signUp.name}
              />
            </div>



            {/* Email Input with Icon */}
            <div className="form-group input-with-icon">
              <i className="fa-solid fa-envelope"></i>
              <input
                onChange={handleChange}
                type="email"
                name='email'
                className="form-control"
                placeholder="Enter email"
                required
                value={signUp.email}
              />

            </div>

            {/* Password Input with Icon */}
            <div className="form-group input-with-icon">
              <i className="fa-solid fa-lock"></i>
              <input
                onChange={handleChange}
                type="password"
                name='password'
                className="form-control"
                placeholder="Enter password"
                required
                value={signUp.password}
              />
            </div>

            <div className="form-group input-with-icon">
              <i className="fa-solid fa-lock"></i>
              <input
                onChange={handleChange}
                type="password"
                name='confirmPassword'
                className="form-control"
                placeholder="Re-enter your password"
                required
                value={signUp.confirmPassword}
              />
               {/* {error && <small style={{ color: "red" }}>{error}</small>} */}
            </div>

            <br />

            {/* Checkbox */}
            <div className="form-group form-check" id="check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={handleCheckboxChange}
              />
              <div className='link'>
                {/* <label className="form-check-label" htmlFor="exampleCheck1">
                  I Accept the terms and conditons </label> */}
                <a href='../asset/terms.html' rel='s'>I Accept the terms and conditions</a>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="button">Sign Up
            </button>
            <p  className='terms'>Already have an account?<Link to={'/login'}>Login</Link></p>
          </div>
          <hr></hr>
          <div className='media-icon'>
            <i class="fa-brands fa-facebook fa-2xl" style={{ color: 'rgb(2, 93, 212)' }}></i>
            <i class="fa-brands fa-instagram fa-2xl" style={{ color: 'rgb(224, 78, 78)' }}></i>
            <i class="fa-brands fa-google fa-2xl" style={{ color: 'rgb(123, 126, 120)' }}></i>
            <i class="fa-brands fa-square-twitter fa-2xl" style={{ color: 'rgb(4, 152, 221)' }}></i>
            <i class="fa-brands fa-linkedin fa-2xl" style={{ color: 'hsl(232, 67.80%, 40.20%)' }}></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
