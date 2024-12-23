import '../App.css';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import ForgotPassword from './forgotPswd';

const Login = () => {


  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  // const [showModal, setShowModal] = useState(false);



  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLogin = { ...login };
    copyLogin[name] = value;
    setLogin(copyLogin);

  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    const rememberMe = document.getElementById('exampleCheck1').checked;

    if (!email || !password) {
      return handleError('email and password are required')
    }

    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      })

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        if (rememberMe) {
          localStorage.setItem('email', email);
        }


        setTimeout(() => {
          navigate('/home')
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  }


  // const openModal = () => setShowModal(true);
  // const closeModal = () => setShowModal(false)





  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <div className="form">
            {/* Email Input with Icon */}
            <div className="form-group input-with-icon">
              <i className="fa-solid fa-envelope"></i>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
                required
                value={login.email}
              />
            </div>

            <br />

            {/* Password Input with Icon */}
            <div className="form-group input-with-icon">
              <i className="fa-solid fa-lock"></i>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={login.password}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter password"
                required
              />

            </div>

            <br />

            {/* Checkbox */}
            <div className="form-group form-check" id="check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                value={login.email || localStorage.getItem('email')}
              />
              <div className='link'>
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me
                </label>
                <a href='' >Forgot password?</a>

              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="button">
              Submit
            </button><br></br>
            <p className='span'>Does't have an account ?
              <Link to="/singup">Signup</Link>
            </p>
          </div>

        </form>

      </div>
      {/* Forgot Password Modal */}
      {/* <ForgotPassword show={showModal} onClose={closeModal} /> */}
    </div>

  );
};

export default Login;
