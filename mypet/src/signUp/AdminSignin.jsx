import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import Header from "./Header"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export default function AdminSignin() {
  const nav = useNavigate();

  const [item, setItem] = useState("")
  const Click = (e) => {
    setItem(e.target.value)
    setItem({ ...item, [e.target.name]: e.target.value })
  }

  const Handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post('http://localhost:7000/api/petregister/Login', item);
      
      if (res.data.success === true) {
        console.log('Login success');
        console.log(res.data);
        localStorage.setItem('Login', JSON.stringify(res.data.authotoken));
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        // nav('/Dashboard');
        setTimeout(() => {
          nav('/Dashboard');
        }, 1000);
        
        // Show success toast
        toast.success('Login successful', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Close the toast after 3 seconds
        });
      } else {
        console.log('Login unsuccessful');
        toast.error('Login unsuccessful. Please register your account.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        
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
      <Header />
      <ToastContainer />
      <Grid
        container
        sx={{
          marginTop:'100px',
          display: 'flex',
          height: '650px',
          backgroundImage: 'url(https://source.unsplash.com/random?animalwallpapers)',
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
            margin: '150px 0px',
            borderRadius: '10px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'whitesmoke',
          }}
        >
          <Typography component="h1" variant="h4">
            SIGN IN FORM
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => Click(e)}
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete=""
              autoFocus
            />
            <TextField
              onChange={(e) => Click(e)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete=""
            />
            <Button onClick={Handlesubmit} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              SUBMIT
            </Button>
          </Box>
          <Grid container>
                <Grid item md>
                  <Link
                    style={{ float: "left", marginRight: "10px" }}
                    to={"/Adminpassreset"}
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid><br />
                <Grid item>
                  <Link to={"/Admin_Register"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
        </Box>
      </Grid>
    </>
  );
}
