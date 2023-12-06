import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardMedia, Button, TextField } from '@mui/material';
import Axios from 'axios';
import { Card, CardActions, CardContent, FormControl, InputLabel, Select, MenuItem, Typography, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ServiceCard({setCurrentPage}) {
  const [data, setData] = useState([]);
  const [viewState, setViewState] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleEdit = (item) => {
    setIsEditing(true);
    setSelectedService({
      ...item,
      category_id: item.category_id._id,
    });
    setSelectedServiceId(item._id);
  };

  const handleUpdate = () => {
    Axios.put(`http://localhost:7000/api/petservice/update/${selectedService._id}`, {
      servicename: selectedService.servicename,
      description: selectedService.description,
      price: selectedService.price,
      status: selectedService.status,
      category_id: selectedService.category_id,
    })
      .then(() => {
        setIsEditing(false);
        setSelectedServiceId(null);
        fetchData();
        toast.success('Service updated successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setTimeout(() => {setCurrentPage('ServiceCard');}, 1000);
      })
      .catch((error) => {
        console.error('Update Error', error);
        toast.error('Failed to update service. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    Axios.get('http://localhost:7000/api/petcategory/view')
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.error('View Error', error);
      });
  }, []);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedServiceId(null);
  };

  const handleDelete = (item) => {
    const message = 'Are you sure you want to delete this Service?';
  
    // Display custom confirm toast
    toast.info(<ConfirmToast message={message} onConfirm={() => performDelete(item)} onCancel={() => console.log('Deletion cancelled')} />, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const ConfirmToast = ({ message, onConfirm, onCancel }) => {
    const handleConfirm = () => {
      toast.dismiss(); // Close the toast
      onConfirm();
    };
  
    const handleCancel = () => {
      toast.dismiss(); // Close the toast
      onCancel();
    };
  
    return (
      <div>
        <div>{message}</div>
        <Button onClick={handleConfirm}>Confirm</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    );
  };

  const performDelete = (item) => {
    Axios.delete(`http://localhost:7000/api/petservice/delete/${item._id}`)
      .then(() => {
        toast.success('Service deleted successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
  
        // Refresh the page after a short delay (adjust the delay as needed)
        setTimeout(() => {setCurrentPage('ServiceCard');}, 1000);
  
        fetchData();
      })
      
      .catch((error) => {
        console.log('Error deleting Service', error);
        toast.error('Failed to delete Service. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  };
  

  let filteredResult=viewState.filter(item =>
    item.servicename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category_id.petname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category_id.breedtype.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
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
            style={{ margin: '10px 0', height: '50px', backgroundColor: 'white', borderRadius: '10px', maxWidth: '10px', marginRight: '4px' }}
            onClick={() => setSearchTerm('')}
          >
            Reset
          </Button>
        </div>
      </div>
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'orange', margin: '10px', justifyContent:'space-around' }}>
        
      {filteredResult.length > 0 ? filteredResult.reverse().map((item) => (
          <Card className="Card" key={item._id} style={{ width: '370px', minWidth: '300px', height: 'auto', margin: '5px 5px 10px 5px', padding: '10px 10px', alignContent: 'center' }}>
            <CardContent>
              {selectedServiceId === item._id && isEditing ? (
                <form>
                  <TextField
                    label='Service Name'
                    style={{ marginBottom: '10px' }}
                    type='text'
                    value={selectedService.servicename}
                    fullWidth
                    onChange={(e) => setSelectedService({ ...selectedService, servicename: e.target.value })}
                    select
                    >
                      <MenuItem value="Custom Groom">Custom Groom</MenuItem>
                      <MenuItem value="Mini Groom">Mini Groom</MenuItem>
                      <MenuItem value="Basic Groom">Basic Groom</MenuItem>
                      <MenuItem value="Spa Bath">Spa Bath</MenuItem>
                    </TextField>
                  <br />
                  <TextField
                    label='Description'
                    style={{ marginBottom: '10px' }}
                    type='text'
                    value={selectedService.description}
                    fullWidth
                    multiline
                    rows={4}
                    onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                  />
                  <br />
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Category name</InputLabel>
                    <Select
                      label="Category name"
                      name="category_id"
                      onChange={(e) => setSelectedService({ ...selectedService, category_id: e.target.value })}
                      value={selectedService.category_id}
                    >
                      {category.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.petname} - {cat.breedtype}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <br />
                  <TextField
                    style={{ marginBottom: '10px' }}
                    type='number'
                    value={selectedService.price}
                    fullWidth
                    onChange={(e) => setSelectedService({ ...selectedService, price: e.target.value })}
                  />
                  <br />
                  <TextField
                    style={{ marginBottom: '10px' }}
                    type='text'
                    value={selectedService.status}
                    fullWidth
                    onChange={(e) => setSelectedService({ ...selectedService, status: e.target.value })}
                    select
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Unavailable">Unavailable</MenuItem>
                  </TextField>
                  <br />
                </form>
              ) : (
                <Typography variant='body2' color='text.secondary'>
                  <CardMedia
                    image={`http://localhost:7000/uploadscategory/${item?.category_id?.photo}`}
                    alt=''
                    style={{ width: '120px', height: '120px', alignContent:'center', borderRadius:'30px', marginLeft:'100px'}}
                    // className='rounded-circle'
                  /><br />
                  <h5><strong>Name:</strong>{item?.servicename}</h5>
                  <h5> <strong> Description:</strong></h5>
                  <div style={{ height: '100px', overflowY: 'auto' }}>
                    <p style={{ wordWrap: 'break-word' }}>
                      <h5 style={{ height: '100px' }}> {item?.description}</h5>
                    </p>
                  </div>
                  <h5 > <strong>Breedtype:</strong> {item?.category_id?.petname}-{item?.category_id?.breedtype}</h5>
                  <h5> <strong>Price: </strong>₹ {item?.price}</h5>
                  <h5> <strong>Status:</strong> {item?.status}</h5>
                </Typography>
              )}
            </CardContent>
            <CardActions style={{ alignContent: 'center' }}>
              {selectedServiceId === item._id && isEditing ? (
                <>
                  <Button onClick={handleUpdate} startIcon={<SaveIcon />}>
                    {/* Update */}
                  </Button>
                  <Button onClick={handleCancelEdit} startIcon={<CancelIcon />}>
                    {/* Cancel */}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handleEdit(item)} startIcon={<EditIcon />}>
                    {/* Edit */}
                  </Button>
                  <Button type='button' onClick={() => handleDelete(item)} startIcon={<DeleteIcon />}>
                    {/* Delete */}
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        )):(<>
            <tr>
              <td colSpan="7">
                <center>
                  <div style={{ background: 'white', width: '1400px',height:'50px', borderRadius: '10px' }}>
                    <p style={{ display: 'flex', margin: '10px 600px 500px 600px',padding:'10px', fontFamily: 'fantasy' }}>No result found!</p>
                  </div>
                </center>
              </td>
            </tr>
        </>)}
      </div>
    </>
  );
}
