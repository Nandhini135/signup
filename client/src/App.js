import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import {Navigate,BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './component/Home.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import ForgotPassword from './component/forgotPswd.js';



function App() { 
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }


  return (
   <BrowserRouter>

 <ToastContainer />
 <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
    
   <Routes>
   <Route path='/' element={<Navigate to="/singup" />} />
   <Route path='/home' element={<Home/>}/>
   
    <Route path='/singup' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path="/forgot-password" element={<ForgotPassword />} />


   </Routes>
   </BrowserRouter>
  )
}

export default App;
