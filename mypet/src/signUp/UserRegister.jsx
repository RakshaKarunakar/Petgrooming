import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Box, Grid, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Validation functions
function validateEmail(email) {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailPattern.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

function validatePassword(password) {
  return password.length >= 8; // Minimum length of 8 characters
}

const defaultTheme = createTheme();

export default function UserRegister() {
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    status: 'Active',
    photo: null,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const nav = useNavigate();

  const handleProfile = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Real-time email validation
    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid email address',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '',
        }));
      }
    }

    // Real-time phone number validation
    if (name === 'phone') {
      if (!validatePhone(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: 'Phone number should contain 10 digits',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: '',
        }));
      }
    }

    // Clear errors when user edits the respective fields
    if (name === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!userData.name || !userData.email || !userData.phone || !userData.photo || !userData.password) {
      toast.error('All fields are required!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        toastId: 'fields-required-toast',
      });
      return;
    }

    // Validate email
    if (!validateEmail(userData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));

      toast.error('Invalid email address', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        toastId: 'invalid-email-toast',
      });

      return;
    }

    // Validate password
    if (!validatePassword(userData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long',
      }));

      toast.error('Password must be at least 8 characters long', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        toastId: 'invalid-password-toast',
      });

      return;
    }

    try {
      // Continue with form submission
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('photo', userData.photo);
      formData.append('address', userData.address);
      formData.append('status', userData.status);

      const res = await Axios.post('http://localhost:7000/api/petuserregister/insert', formData);

      if (res.data.success) {
        console.log('Registration successful');
        setTimeout(() => {
          nav('/');
        }, 1000);

        toast.success('Registration successful!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else if (res.data.errors === "Email ID already exists") {
        // Email already exists
        setErrors({
          email: 'Email is already registered',
        });

        toast.error('Email is already registered', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          toastId: 'email-exists-toast',
        });
      } else {
        toast.error('Failed to register. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          toastId: 'registration-failed-toast',
        });
      }
    } catch (error) {
      console.error('Registration Error', error);

      toast.error('Failed to register. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        toastId: 'registration-failed-toast',
      });
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <ToastContainer />
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?catwallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                mt: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main', marginTop: '10px' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Box component="form" sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="photo"
                  label="Photo"
                  name="photo"
                  type="file"
                  autoComplete="photo"
                  autoFocus
                  onChange={handleProfile}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="number"
                  id="phone"
                  autoComplete="phone"
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />


                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </Box>
              <br />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

