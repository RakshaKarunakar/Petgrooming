import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';

export default function UserSignin() {
  const nav = useNavigate();

  const [item, setItem] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });

    // Clear the error message when the user starts typing
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Reset error messages
    setErrors({
      email: '',
      password: '',
    });
  
    try {
      const res = await Axios.post('http://localhost:7000/api/petuserregister/Login', item);
  
      console.log(res.data); // Add this line to log the response
  
      if (res.data.success === true) {
        console.log('Login success');
        console.log(res.data);
        localStorage.setItem('Login', JSON.stringify(res.data.authotoken));
        localStorage.setItem('User', JSON.stringify(res.data.user));
  
        // Regular login success
        toast.success('Login successful.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setTimeout(() => {
          nav('/UserPage');
        }, 1000);
      } else {
        // Handle other login errors
        console.log('Login unsuccessful');
  
        if (res.data.error === 'Invalid credential email') {
          setErrors({
            email: 'Email or password is incorrect',
            password: 'Email or password is incorrect',
          });
          toast.error('Login unsuccessful. Please check your credentials and try again.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            toastId: 'error-toast',
          });
  
          // Navigate only when both email and password are incorrect
          setTimeout(() => {
            nav('/User_Register');
          }, 3000);
        } else if (res.data.error === 'Password not matched') {
          setErrors({
            email: '',
            password: 'Password is incorrect',
          });
        } else {
          // Check if the account is disabled
          if (res.data.user && res.data.user.status === 'Disabled') {
            // Account is blocked
            console.error('Account is blocked');
          }
          toast.error('Your account is blocked. Please contact support.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
  
      // Show error toast on unexpected errors
      toast.error('An unexpected error occurred. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  

  return (
    <>
      <ToastContainer />
      <Grid
        container
        sx={{
          marginTop: '100px',
          display: 'flex',
          height: '650px',
          backgroundImage: 'url(https://source.unsplash.com/random?catwallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            width: 400,
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'ButtonShadow',
            margin: '150px 0px',
          }}
        >
          <Typography component="h1" variant="h5">
            USER SIGN IN
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              value={item.email}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete=""
              autoFocus
            />
            <TextField
              onChange={handleChange}
              value={item.password}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete=""
            />
            <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              SUBMIT
            </Button>
          </Box>
          <Grid container>
            <Grid item md>
              <Link
                style={{ float: "left", marginRight: "10px" }}
                to={"/ForgotPassword"}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid><br />
            <Grid item>
              <Link to={"/User_Register"} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </Grid>
    </>
  );
}
