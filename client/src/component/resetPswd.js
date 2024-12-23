import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Call the reset-password API
      const response = await axios.post('http://localhost:5000/auth/reset-password', {
        token,
        newPassword,
      });
      setMessage('Password reset successfully! You can now log in.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password.');
    }

    setLoading(false);
  };

  return (
    <div className="reset-password">
      <h3>Reset Password</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
