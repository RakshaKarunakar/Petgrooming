import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Modal, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Axios from 'axios';
import Userheader from './Userheader';
import AppointmentForm from './AppointmentForm';
import { useNavigate } from 'react-router-dom';


export default function ViewService() {
  const [data, setData] = useState([]);
  const [viewState, setViewState] = useState([]);
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);

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
    Axios.get('http://localhost:7000/api/petcategory/view')
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.error('View Error', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get('http://localhost:7000/api/petservice/view')
      .then((res) => {
        setViewState(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error('View Error', error);
      });
  };

  const handleOpen = (item) => {
    setOpen(true);
    setSelectedService(item);
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 'auto',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 1,
    p: 1,
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  let filteredResult=viewState
    .filter((item) =>
      item.servicename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category_id.petname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category_id.breedtype.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <>

      <div style={{ backgroundColor: 'orange', height:'auto' }}>
        <br />
        <div style={{ margin: '0px', marginTop: '0px' }}>
          <Userheader />
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px', alignItems: 'center' }}>
          <div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              style={{ margin: '20px 10px 20px 500px', height: '50px', backgroundColor: 'white', borderRadius: '10px', maxWidth: '300px' }}
              type="search"
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className="btn btn-primary"
              style={{ margin: '20px 0', height: '50px', backgroundColor: 'white', borderRadius: '10px', maxWidth: '10px', marginRight: '4px' }}
              onClick={() => setSearchTerm('')}
            >
              Reset
            </Button>
          </div>
        </div><hr />
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
          {filteredResult.length > 0 ? filteredResult.map((item) => (
            <Card
              className="Card"
              key={item._id}
              style={{
                width: '300px',
                height: 'auto',
                margin: '10px 20px',
                padding: '10px',
                textAlign: 'center',
                transition: 'width 0.3s ease', // Adding smooth transition
                '&:hover': { width: '350px' }, // Increasing width on hover
              }}
            >
              <CardMedia
                image={`http://localhost:7000/uploadscategory/${item?.category_id?.photo}`}
                alt=''
                style={{ width: '150px', height: '150px', margin: 'auto', marginTop: '10px', alignContent: 'center', borderRadius:'20px' }}
                className='rounded-circle'
              />

              <CardContent>
                <Typography variant='h6' color='textPrimary' gutterBottom>
                  {item?.servicename}
                </Typography>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  component='p'
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: showFullDescription ? 'unset' : 2,
                  }}
                >
                  {item.description}
                </Typography>
                {item.description.length > 50 && (
                  <span
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    style={{ cursor: 'pointer', color: 'blue', display: 'block', marginTop: '5px' }}
                  >
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </span>
                )}
                <Typography variant='body1' color='textSecondary'>
                  Breedtype: {item?.category_id?.petname}-{item?.category_id?.breedtype}
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                  Price: ${item?.price}
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                  Status: {item?.status}
                </Typography>
              </CardContent>

              <CardActions style={{ justifyContent: 'center' }}>
                <Button
                  onClick={() => handleOpen(item)}
                  variant='contained'
                  size='small'
                  color='primary'
                  disabled={item.status === 'Unavailable'}
                >
                  Take Appointment
                </Button>
              </CardActions>
            </Card>
          )) : (<>
            <tr>
              <td colSpan="7">
                <center>
                  <div style={{ background: 'white', width: '1400px', height: '50px', borderRadius: '10px' }}>
                    <p style={{ display: 'flex', margin: '10px 600px', height: '50px', fontFamily: 'fantasy' }}>No result found!</p>
                  </div>
                </center>
              </td>
            </tr>
          </>)}
        </div>

        <hr />
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <AppointmentForm
              selService={{ ...selectedService, service_id: selectedService.service_id }}
              handleClose={handleClose}
            /> */}
            <AppointmentForm selService={selectedService} handleClose={handleClose} service_id={selectedService.service_id} />
          </Box>
        </Modal>
      </div>

    </>
  );
}
