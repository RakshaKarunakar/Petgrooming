import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import Axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ServiceForm({setCurrentPage}) {
  const [Admin, setAdmin] = useState('');
  const [petcategory, setPetcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [service, setService] = useState({
    servicename: '',
    description: '',
    price: '',
    category: '',
    status: 'Available',
  });

  const navigate = useNavigate();
  useEffect(() => {
    const loggedInAdmin = JSON.parse(localStorage.getItem('Login'));
    console.log('Admin Token:', loggedInAdmin);

    if (!loggedInAdmin) {
      navigate('/');
    } else {
      setAdmin(loggedInAdmin);
    }
  }, [Admin]);

  useEffect(() => {
    Axios.get('http://localhost:7000/api/petcategory/view')
      .then((res) => {
        setPetcategory(res.data);
      })
      .catch((error) => {
        console.error('View Error', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleCatChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const IncrementCount=async()=>{
    setTimeout(async()=>{
      await setCurrentPage('ServiceCard');
    },4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        'http://localhost:7000/api/petservice/insert',
        {
          servicename: service.servicename,
          description: service.description,
          price: service.price,
          status: service.status,
          category: selectedCategory,
        },
        {
          headers: { 'auth-token': Admin },
        }
      );

      if (response.status === 200) {
        console.log(response.data, 'responseData');

        toast.success('Service inserted successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        IncrementCount();
      } else {
        console.log('Service did not insert');
      }

    } catch (error) {
      console.error('Error', error);
      toast.error('Failed to insert service. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div style={{ backgroundColor: 'orange', marginTop: '30px' }}>
      <Grid
        container
        sx={{
          display: 'flex',
          height: '650px',
          backgroundColor: 'orange',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        alignItems="center"
        justifyContent="center"
      >
        <div>
          <Box
            sx={{
              width: 400,
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'whitesmoke',
            }}
          >
            <ToastContainer />
            <h4>Add Services</h4>
            <TextField
              margin="normal"
              required
              fullWidth
              id="input-with-sx"
              label="Service Name"
              name="servicename"
              type="text"
              onChange={handleChange}
              select
              >
                <MenuItem value="Custom Groom">Custom Groom</MenuItem>
                <MenuItem value="Mini Groom">Mini Groom</MenuItem>
                <MenuItem value="Basic Groom">Basic Groom</MenuItem>
                <MenuItem value="Spa Bath">Spa Bath</MenuItem>
              </TextField>

            <TextField
              margin="normal"
              required
              fullWidth
              id="input-with-sx"
              label="Description"
              name="description"
              type="text"
              multiline
              rows={3}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="input-with-sx"
              onChange={handleChange}
            />

            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="petcategory-label">Pet Category</InputLabel>
              <Select
                required
                fullWidth
                label="Pet Category"
                name="category"
                variant="outlined"
                autoComplete="type"
                onChange={handleCatChange}
                value={selectedCategory}
              >
                {petcategory.filter((item) => item.status === 'Available') // Filter categories with status 'available'
                  .map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.petname} - {item.breedtype}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </Box>
        </div>
      </Grid>
    </div>
  );
}
