import React, { useState, useEffect } from 'react';
import { TextField, Button, Input, IconButton } from '@mui/material';
import Axios from 'axios';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';

export default function UserProfile({ handleUserDataModalClose }) {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('User')));
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [users, setUsers] = useState(''); 

  const nav = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('Login') === null) {
      nav('/');
    } else {
      setUsers(JSON.parse(localStorage.getItem('Login')));
    }
  }, [users]);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('phone', userData.phone);
    formData.append('email', userData.email);
    if (profilePhoto) {
      formData.append('photo', profilePhoto);
    }

    Axios.put(`http://localhost:7000/api/petuserregister/update/${userData._id}`, formData)
      .then((res) => {
        // Update the user data including the new photo URL
        const updatedUserData = { ...userData, photo: res.data.photo }; // Assuming the server response includes the updated photo URL
        localStorage.setItem('User', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        setIsEditing(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Update Error', error);
      });
  }

  const handleCancel = () => {
    setUserData(JSON.parse(localStorage.getItem('User')))
    setIsEditing(false);
  }

  const handleFileChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  }

  return (
    <>
      <div>
        <center><br />
        <h4 style={{color:'orange'}}>{userData.name}'s Profile</h4>
          
          {isEditing ? (
            <>
              {profilePhoto ? (
                <photo
                  src={URL.createObjectURL(profilePhoto)}
                  alt="Selected Image"
                  style={{ width: '150px', height: '150px', margin: '10px 10px' }}
                />
              ) : (
                <img
                  src={`http://localhost:7000/uploaduserphotos/${userData.photo}`}
                  alt=""
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', margin: '10px 10px' }}
                />
              )}

              <label >
                <Input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCameraIcon style={{ fontSize: 50, margin: '10px 10px -115px -70px' }} />
                </IconButton>
              </label>
            </>
          ) : (
            <img
              src={`http://localhost:7000/uploaduserphotos/${userData.photo}`}
              alt=""
              className="rounded-circle"
              style={{ width: '150px', height: '150px', margin: '10px 10px' }}
            />
          )}

          {!isEditing ? (
            <h6 style={{ marginBottom: '15px' }}>
              <strong>Name:</strong> {userData.name}
            </h6>
          ) : (
            <TextField
              label="Name"
              value={userData.name}
              fullWidth
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              InputProps={{
                style: { margin: '10px 0px', fontSize: '15px' },
              }}
            />
          )}


          {!isEditing ? (
            <h6 style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> {userData.email}
            </h6>
          ) : (
            <TextField
              label="Email"
              value={userData.email}
              fullWidth disabled
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              InputProps={{
                style: { margin: '10px 0px', fontSize: '15px' },
              }}
            />
          )}

          {!isEditing ? (
            <h6 style={{ marginBottom: '15px' }}>
              <strong>Phone:</strong> {userData.phone}
            </h6>
          ) : (
            <TextField
              label="Phone"
              value={userData.phone}
              fullWidth
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              InputProps={{
                style: { margin: '10px 0px', fontSize: '15px' },
              }}
            />
          )}

          {!isEditing ? (
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" class="btn btn-info m-2" onClick={handleUpdate}>
                  Update
                </Button>
                <Button variant="contained" class="btn btn-danger m-2" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </center>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
      <Button variant="outlined" /*class="btn btn-info m-2"*/ onClick={handleUserDataModalClose}>
        Close
      </Button>
      </div>
    </>
  );
}
