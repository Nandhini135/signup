import { useState } from 'react';
import '../style/forgotPswd.css';
import axios from 'axios';

const ForgotPassword = ({ show = true, onClose = () => {} }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email entered:", email);  // Check the email input
    console.log("Form submitted");
    
    // Simulate API request
    setTimeout(() => {
      console.log("Password reset for:", email);
      onClose();
    }, 1000);
    setLoading(true);
    setMessage('');

    try {
      // Make API call to reset password
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      setMessage('Password reset email sent successfully! Check your inbox.');
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error: Could not reset password. Please try again.');
    }

    setLoading(false);
    console.log('Password reset for:', email);
    onClose();
  };

  // Ensure the modal is hidden if `show` is false
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email||""}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br></br>
          <button type="submit" className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
