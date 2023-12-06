import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Axios from 'axios';
import Userheader from './Userheader';
import FeedbackForm from './FeedbackForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function AppointmentStatus() {
  const [viewState, setViewState] = useState([]);
  const [deletes, setDelete] = useState([]);
  const [users, setUsers] = useState(''); 

  const nav = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('Login') === null) {
      nav('/');
    } else {
      setUsers(JSON.parse(localStorage.getItem('Login')));
    }
  }, [users]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('Login'));
    Axios.get('http://localhost:7000/api/petappointment/view', { headers: { "Login": loggedInUser } })
      .then((res) => {
        setViewState(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Appointment View Error', error);
      });
  };

  const getStatusOrder = (status) => {
    switch (status) {
      case 'Requested':
        return 1;
      case 'Accepted':
        return 2;
      case 'Completed':
        return 3;
      default:
        return 4; // Default order for other statuses
    }
  };

  const sortedView = viewState
    .slice()
    .sort((a, b) => getStatusOrder(a.status) - getStatusOrder(b.status) || new Date(b.appointment_date) - new Date(a.appointment_date));

  const handledelete = async (item) => {
    try {
      const res = await Axios.delete(`http://localhost:7000/api/petappointment/delete/${item._id}`);
      const val = res.data;
      setDelete((prev) => !prev);
      toast.success('Appointment canceled successfully!');

      // Delay the page refresh after showing the toast
      setTimeout(() => {
        window.location.reload();
      }, 3000); // You can adjust the delay time (in milliseconds) as needed
    } catch (error) {
      console.log('error', error);
      toast.error('Error canceling appointment.');
    }
  };


  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = (item) => {
    setOpen(true);
    setSelectedAppointment(item);
  };

  const handleClose = () => setOpen(false);

  const calculateTotalPrice = (item) => {
    const appointmentPrice = item?.price || 0;
    const totalPrice = item.service_id?.price + appointmentPrice;
    return totalPrice.toFixed(2); // Adjust the precision as needed
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Completed':
        return 'blue';
      default:
        return 'violet'; // Default color for other statuses
    }
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: '500',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 0,
    borderRadius: '10px',
    p: 0,
  };

  return (
    <>
      <ThemeProvider theme={theme}></ThemeProvider>
      <div style={{ backgroundColor: 'orange', height: '800px' }}>
        <div style={{ margin: 'px', marginTop: '0px' }}>
          <Userheader />
        </div>
        <hr />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: 'orange', marginTop: '100px', }}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />

          {sortedView.length === 0 ? (
            <Typography variant="h6" color="textSecondary" component="p" style={{ textAlign: 'center' }}>
              No appointments found.
            </Typography>
          ) : (
            sortedView.map((item) => {

              return (
                <Card className="Card" key={item._id} style={{ justifyContent: 'space-around', margin: '20px', width: '300px', alignItems: 'center', borderRadius: '10px', padding: '10px' }}>
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      <br />

                      {/* Owner Name */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '8px' }}>Owner Name:</h6>
                        <h6 style={{ color: 'blue', border: '5px' }}>{item?.ownername}</h6>
                      </div>

                      {/* Phone Number */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '8px' }}>Phone Number:</h6>
                        <h6 style={{ color: 'blue', border: '5px' }}>{item?.phone}</h6>
                      </div>

                      {/* Pet Name */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '8px' }}>Pet Name:</h6>
                        <h6 style={{ color: 'blue', border: '5px' }}>{item?.pet_name}</h6>
                      </div>

                      {/* Pet Age */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '8px' }}>Pet Age:</h6>
                        <h6 style={{ color: 'blue', border: '5px' }}>{item?.pet_age}</h6>
                      </div>

                      {/* Appointment Date */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '8px' }}>App Date:</h6>
                        <h6 style={{ color: 'blue', border: '5px' }}>{formatDateTime(item?.appointment_date)}</h6>
                      </div>

                      {/* Service */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '8px' }}>Service:</h6>
                        <h6 style={{ color: 'blue', border: '5px' }}>{item?.service_id?.servicename}</h6>
                      </div>

                      {/* Category */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '8px' }}>Category:</h6>
                        <h6 style={{ color: 'blue', border: '5px' }}>{item?.category_id?.petname} - {item?.category_id?.breedtype}</h6>
                      </div>

                      {/* Notes */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '8px' }}>Notes:</h6>
                        <h6 style={{ color: 'blue', border: '5px' }}>{item?.notes}</h6>
                      </div>

                      {/* Total Price */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '8px' }}>Total Price:</h6>
                        <h6 style={{ color: 'blue', border: '5px' }}>₹{calculateTotalPrice(item)}</h6>
                      </div>
                      <hr />
                      {/* Status */}
                      <div style={{ margin: '0px 10px 0px 80px', border: '0px solid', borderRadius: '10px', padding: '2px', alignContent: 'center' }}>
                        <h6 style={{ color: getStatusColor(item?.status), margin: 0 }}>{item?.status}</h6>
                      </div>

                    </Typography>

                  </CardContent>
                  <CardActions style={{ alignContent: 'center', marginLeft: '60px' }}>
                    {item.status === 'Requested' && (
                      <Button
                        onClick={() => handledelete(item)}
                        variant='contained'
                        size='small'
                        color='secondary'
                      >
                        Cancel Booking
                      </Button>
                    )}
                    {item.status === 'Completed' && (
                      <Button onClick={() => handleOpen(item)} variant='contained' size='small' color='primary'>
                        Write Feedback
                      </Button>
                    )}
                  </CardActions>
                </Card>
              );
            })
          )}
        </div>

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <FeedbackForm selAppointment={selectedAppointment}
                handleClose={handleClose} appointment_id={selectedAppointment.appointment_id} />
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );

  // Helper function to format date and time
  function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }
}
