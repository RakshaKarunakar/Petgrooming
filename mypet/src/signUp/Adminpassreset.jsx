import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Adminpassreset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (input) => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePassword = (input) => {
    // Password must be at least 6 characters
    return input.length >= 8;
  };

  const handleResetPassword = async () => {
    try {
      // Validate email
      if (!validateEmail(email)) {
        toast.error('Invalid email format.');
        return;
      }

      // Validate passwords
      if (newPassword !== confirmPassword || !validatePassword(newPassword)) {
        toast.error('Passwords must match and be at least 8 characters.');
        return;
      }

      const response = await axios.post('http://localhost:7000/api/petregister/Passwordreset', { email, newPassword });

      if (response.data.success) {
        toast.success(response.data.success, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        // Redirect to login page after successful password reset
        setTimeout(() => {
          navigate('/AdminSignin');
        }, 1000);
      } else {
        setMessage(response.data.error);
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Error resetting password. Check console for details.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <ToastContainer />
      <div
        style={{
          marginTop: '100px',
          display: 'flex',
          height: '650px',
          backgroundImage: 'url(https://source.unsplash.com/random?catwallpapers)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <center>Admin Password Reset</center>
            </Typography>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              error={!validateEmail(email)}
              helperText={!validateEmail(email) ? 'Invalid email format' : ''}
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
              error={!validatePassword(newPassword)}
              helperText={!validatePassword(newPassword) ? 'Password must be at least 6 characters' : ''}
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
              error={newPassword !== confirmPassword}
              helperText={newPassword !== confirmPassword ? 'Passwords do not match' : ''}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleResetPassword}
              fullWidth
              style={{ marginTop: 20 }}
            >
              Reset Password
            </Button>
            {message && (
              <Typography variant="body2" color={message.includes('Error') ? 'error' : 'success'} style={{ marginTop: 10 }}>
                {message}
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
