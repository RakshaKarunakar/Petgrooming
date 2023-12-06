import React, { useState, useEffect } from 'react';
import { Button, TextField, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

export default function AppointmentForm(props) {
  const { handleClose, selService } = props;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ownername: '',
    phone: '',
    pet_name: '',
    pet_age: '',
    appointment_date: '',
    service_id: selService,
    category_id: selService.category_id,
    notes: '',
    price:'0',
    status: 'Requested',
  });

  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('Login'));
    console.log('User Token:', loggedInUser);

    if (!loggedInUser) {
      navigate('/'); // Use navigate to navigate
    } else {
      setUser(loggedInUser);
    }
  }, [user,navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' && value.length > 10) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }

    if (name === 'ownername') {
      setNameError(!/^[A-Za-z, ]*$/.test(value));
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.ownername.trim() === '' || form.phone.trim() === '') {
      toast.error('Please fill out the Name and Phone Number fields.');
    } else {
      try {
        const response = await Axios.post('http://localhost:7000/api/petappointment/insert', form, {
          headers: { 'Login': user },
        });

        if (response.status === 200) {
          toast.success('Appointment sent successfully!', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          setTimeout(() => {
            navigate('/AppointmentStatus');
          }, 1000);
        } else {
          console.log('Value did not insert');
        }
      } catch (error) {
        console.error('Error', error);
      }

      setForm({
        ownername: '',
        phone: '',
        pet_name: '',
        pet_age: '',
        appointment_date: '',
        service_id: selService.service_id,
        category_id: selService.category_id,
        notes: '',
        status: 'Requested',
      });

      // Show a toast alert for form reset
      // toast.info('Form reset successfully!');
    }
  };

  return (
    <center>
      <div className="form-listing">
        <ToastContainer />
        <div className='form-card' sx={{ display: 'flex', alignItems: 'flex-center', maxWidth: 400, height: 680 }}>
        
          <br />
          <h3>Appointment</h3>
          <br />
          <TextField
            placeholder='Enter your ownername'
            type="text"
            name='ownername'
            label='ownername'
            sx={{ width: '60%', mr: 0.5, my: 0.5, minHeight: '30px', borderColor: nameError ? 'red' : '' }}
            required={true}
            error={nameError}
            helperText={nameError ? 'Name should contain only letters and commas' : ''}
            onChange={(e) => handleChange(e)}
          />

          <br />
          <TextField
            placeholder='Enter your PhoneNo'
            type="number"
            name='phone'
            label='Phone'
            sx={{ width: '60%', mr: 0.5, my: 0.5, minHeight: '30px', borderColor: phoneError ? 'red' : '' }}
            required={true}
            error={phoneError}
            helperText={phoneError ? 'Phone number should be 10 digits or less' : ''}
            onChange={(e) => handleChange(e)}
          />

          <br />
          <TextField
            placeholder='Enter your pet_name'
            type="text"
            name='pet_name'
            label='pet_name'
            sx={{ width: '60%', mr: 0.5, my: 0.5, minHeight: '30px' }}
            onChange={(e) => handleChange(e)}
          />

          <br />
          <TextField
            placeholder='Enter total pet_age'
            type="number"
            name='pet_age'
            label='pet_age'
            sx={{ width: '60%', mr: 0.5, my: 0.5, minHeight: '30px' }}
            required={true}
            onChange={(e) => handleChange(e)}
          />

          <br />
          <Tooltip title="Appointment Date and Time">
            <TextField
              placeholder='Appointment Date and Time'
              type="datetime-local"
              name='appointment_date'
              sx={{ width: '60%', mr: 0.5, my: 0.5, minHeight: '30px' }}
              required={true}
              onChange={(e) => handleChange(e)}
            />
          </Tooltip>

          <TextField
            placeholder='Enter notes'
            type="text"
            name='notes'
            label='notes'
            sx={{ width: '60%', mr: 0.5, my: 0.5, minHeight: '30px' }}
            multiline rows={2} required={true}
            onChange={(e) => handleChange(e)}
          />

          <br />
          <div>
            <center spacing={3} direction="row">
              <Button variant="contained" onClick={handleSubmit} disabled={form.ownername.trim() === '' || form.phone.trim() === ''}>
                Submit
              </Button>
            </center>
            <Button size='small' variant='contained' onClick={handleClose} style={{ marginTop: '-60px', marginLeft: '400px' }}>
              Close
            </Button>
          </div>
          <br />
        </div>
      </div>

    </center>
  );
}

