import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FeedbackForm(props) {
  const { handleClose, selAppointment } = props;

  const [formData, setFormData] = useState({
    feedback: '',
    status: 'New',
    appointment_id: selAppointment,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        'http://localhost:7000/api/petfeedback/insert',
        formData
      );

      if (response.status === 200) {
        toast.success('Feedback sent successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        handleClose();
        // window.location.reload(); // Refresh the page
      } else {
        console.log('Value did not insert');
        alert('Feedback sent Successfully');
      }
    } catch (error) {
      console.error('Error', error);
      toast.error('Failed to send feedback. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };


  return (
    <div style={{ textAlign: 'center', backgroundColor: '#e3b764', height: '400px' }}>
      <ToastContainer />
      <br />
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit} style={{ margin: '10px 0' }}>
        <label>
          <TextField
            style={{ width: '450px', margin: '5px 5px', backgroundColor: 'whitesmoke' }}
            label='Enter your feedback'
            type="text"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={6}
            variant="outlined"
          />
        </label><br />

        <Button
          type="submit"
          size='medium'
          variant='contained'
          color='primary'
          style={{ margin: '10px 0' }}
        >
          Submit Feedback
        </Button>
      </form><br />

      <Button
        size='medium'
        variant='contained'
        color='secondary'
        onClick={handleClose}
        style={{ marginTop: '-20px' }}
      >
        Close
      </Button>
    </div>
  );
}
