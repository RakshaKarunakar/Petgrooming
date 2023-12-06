import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import Axios from 'axios';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Userprofiledata({ setCurrentPage }) {
    const [data, setData] = useState([]);
    const [viewState, setViewState] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = () => {
        Axios.get('http://localhost:7000/api/petuserregister/view')
            .then((res) => {
                setViewState(res.data);
                setData(res.data);
                fetchData();
            })
            .catch((error) => {
                console.error('View Error', error);
            });
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setSelectedUser(item);
        setSelectedUserId(item._id);
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('name', selectedUser.name);
        formData.append('phone', selectedUser.phone);
        formData.append('email', selectedUser.email);
        formData.append('address', selectedUser.address);
        formData.append('status', selectedUser.status);

    // Check if a new photo is selected
        if (selectedUser.photo instanceof File) {
            formData.append('photo', selectedUser.photo);
        }
      
        Axios.put(`http://localhost:7000/api/petuserregister/update/${selectedUser._id}`, formData)
          .then((res) => {
            setIsEditing(false);
            toast.success('Profile updated successfully!', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setTimeout(() => {
              setCurrentPage('Userprofiledata');
            }, 1000);
          })
          .catch((error) => {
            console.error('Update Error', error);
            toast.error('Failed to update profile. Please try again.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          });
      };
      

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedUserId(null);
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

    const handleDelete = (item) => {
      const message = 'Are you sure you want to delete this profile?';
    
      // Display custom confirm toast
      toast.info(<ConfirmToast message={message} onConfirm={() => performDelete(item)} onCancel={() => console.log('Deletion cancelled')} />, {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    
    const performDelete = (item) => {
      Axios.delete(`http://localhost:7000/api/petuserregister/delete/${item._id}`)
        .then(() => {
          toast.success('profile deleted successfully!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
    
          // Refresh the page after a short delay (adjust the delay as needed)
          setTimeout(() => {setCurrentPage('Userprofiledata');}, 1000);
    
          fetchData();
        })
        
        .catch((error) => {
          console.log('Error deleting profile', error);
          toast.error('Failed to delete profile. Please try again.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    };
    
      
    const handlephotoChange = (e) => {
        const file = e.target.files[0];
        setSelectedUser({ ...selectedUser, photo: file, photoURL: URL.createObjectURL(file) });
    };

    
    return (
        <>
        <ToastContainer />
            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'orange', margin: '50px 10px',justifyContent:'space-around' }}>

                {viewState.map((item, index) => (

                    <Card className="Card" key={item._id} style={{ width: '330px', height: 'auto', margin: '10px 20px', alignContent: 'center' }}>
                        <CardContent>
                            {selectedUserId === item._id && isEditing ? (
                                <form>
                                    <CardMedia
                                        sx={{ height: 300 }}
                                        image={selectedUser.photoURL || `http://localhost:7000/uploaduserphotos/${item.photo}`}
                                        alt=""
                                        style={{ width: '150px', height: '150px' }}
                                        className="rounded-circle"
                                    /><br />
                                    <TextField
                                        style={{ margin: '5px 0px' }}
                                        type="file"
                                        accept="image/*"
                                        id="file-input"
                                        label="photo"
                                        onChange={handlephotoChange}
                                    /><br />
                                    <TextField
                                        style={{ marginBottom: '5px' }}
                                        type='text'
                                        value={selectedUser.name}
                                        fullWidth
                                        label="Name"
                                        onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                    /> <br />
                                    <TextField
                                        style={{ marginBottom: '5px' }}
                                        type='text'
                                        value={selectedUser.phone}
                                        fullWidth
                                        label="Phone"
                                        onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                                    /> <br />
                                    <TextField
                                        style={{ marginBottom: '5px' }}
                                        type='text'
                                        value={selectedUser.email}
                                        fullWidth
                                        label="Email"
                                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                    /> <br />
                                    <TextField
                                        style={{ marginBottom: '5px' }}
                                        type='text'
                                        value={selectedUser.address}
                                        fullWidth
                                        label="Address"
                                        onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
                                    /> <br />
                                    <TextField
                                        style={{ marginBottom: '5px', height: '5px' }}
                                        type='text'
                                        value={selectedUser.status}
                                        fullWidth
                                        label="Status"
                                        onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                                        select
                                    >
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="Disabled">Disabled</MenuItem>
                                        <MenuItem value="Inactive">Inactive</MenuItem>
                                    </TextField><br />
                                </form>
                            ) : (
                                <Typography variant='body2' color='text.secondary'>
                                    <center>
                                        <CardMedia
                                            image={`http://localhost:7000/uploaduserphotos/${item.photo}`}
                                            alt=''
                                            style={{ width: '150px', height: '150px' }}
                                            className='rounded-circle'
                                        />
                                        <br />
                                        <h5>Name: {item.name}</h5>
                                        <h5>Phone: {item.phone}</h5>
                                        <h5>Email: {item.email}</h5>
                                        <h5>address: {item.address}</h5>
                                        <h5>status: {item.status}</h5>
                                    </center>
                                </Typography>
                            )}
                        </CardContent>

                        <CardActions style={{ alignContent: 'center', marginLeft: '100px' }}>
                            {selectedUserId === item._id && isEditing ? (
                                <>
                                    <Button onClick={handleUpdate} startIcon={<SaveIcon />}>
                                        {/*Update*/}
                                    </Button>
                                    <Button onClick={handleCancelEdit} startIcon={<CancelIcon />}>
                                        {/*Cancel*/}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => handleEdit(item)} startIcon={<EditIcon />}>
                                        {/*Edit*/}
                                    </Button>
                                    <Button type='button' onClick={() => handleDelete(item)} startIcon={<DeleteIcon />}>
                                        {/*Delete*/}
                                    </Button>
                                </>
                            )
                            }
                        </CardActions>
                    </Card>
                ))}
            </div><br /><br /><br />
            <br />
        </>
    );
}
