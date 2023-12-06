import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem } from '@mui/material';
import Axios from 'axios';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CategoryCard({setCurrentPage}) {
  const [data, setData] = useState([]);
  const [viewState, setViewState] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const nav = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get('http://localhost:7000/api/petcategory/view')
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
    setSelectedCategory(item);
    setSelectedCategoryId(item._id);
  };

  const handleUpdate = () => {
    const Data = new FormData();
    Data.append('petname', selectedCategory.petname);
    Data.append('breedtype', selectedCategory.breedtype);
    Data.append('status', selectedCategory.status);
    if (selectedCategory.photo instanceof File) {
      Data.append('photo', selectedCategory.photo);
    }
  
    Axios.put(`http://localhost:7000/api/petcategory/update/${selectedCategory._id}`, Data)
      .then((res) => {
        setIsEditing(false);
        setSelectedCategoryId(null);
        fetchData(); // Refresh data after update
  
        // Display success toast
        toast.success('Category updated successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
        });
        setTimeout(() => {setCurrentPage('CategoryCard');}, 1000);
      })
      .catch((error) => {
        console.error('Update Error', error);
  
        // Display error toast
        toast.error(`Failed to update category. Error: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
  
      });
  };
  

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedCategoryId(null);
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
  const message = 'Are you sure you want to delete this category?';

  // Display custom confirm toast
  toast.info(<ConfirmToast message={message} onConfirm={() => performDelete(item)} onCancel={() => console.log('Deletion cancelled')} />, {
    position: toast.POSITION.TOP_CENTER,
  });
};

const performDelete = (item) => {
  Axios.delete(`http://localhost:7000/api/petcategory/delete/${item._id}`)
    .then(() => {
      toast.success('Category deleted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });

      // Refresh the page after a short delay (adjust the delay as needed)
      setTimeout(() => {setCurrentPage('CategoryCard');}, 1000);

      fetchData();
    })
    
    .catch((error) => {
      console.log('Error deleting category', error);
      toast.error('Failed to delete category. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    });
};

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedCategory({ ...selectedCategory, photo: file, photoURL: URL.createObjectURL(file) });
  };

  let filteredResult=viewState.filter(item =>
    item.petname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.breedtype.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <ToastContainer />
      <div className="input-group" style={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
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
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'orange', margin: '10px',justifyContent:'space-around' }}>
      {filteredResult.length > 0 ? filteredResult.reverse().map((item) => (
          <Card className="Card" key={item._id} style={{ margin: '10px 10px 10px 20px', width: '300px', alignItems: 'center' }}>
            <CardContent>
              {selectedCategoryId === item._id && isEditing ? (
                <form>
                  <CardMedia
                    sx={{ height: 100 }}
                    image={selectedCategory.photoURL || `http://localhost:7000/uploadscategory/${item.photo}`}
                    alt=""
                    style={{ width: '100px', height: '100px' }}
                    className="rounded-circle"
                  />
                  <br />
                  <TextField
                    style={{ margin: '10px 0px' }}
                    type="file"
                    accept="image/*"
                    id="file-input"
                    onChange={handlePhotoChange}
                  />
                  <br />
                  <TextField
                    style={{ marginBottom: '10px' }}
                    type='text'
                    value={selectedCategory.petname}
                    fullWidth
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, petname: e.target.value })}
                    select
                    >
                      <MenuItem value="Dog">Dog</MenuItem>
                      <MenuItem value="Cat">Cat</MenuItem>
                      <MenuItem value="Rabbit">Rabbit</MenuItem>
                      <MenuItem value="Bird">Bird</MenuItem>
                    </TextField>
                  <br />
                  <TextField
                    style={{ marginBottom: '10px' }}
                    type='text'
                    value={selectedCategory.breedtype}
                    fullWidth
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, breedtype: e.target.value })}
                  />
                  <br />
                  <TextField
                    style={{ marginBottom: '10px' }}
                    type='text'
                    value={selectedCategory.status}
                    fullWidth
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, status: e.target.value })}
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
                    image={`http://localhost:7000/uploadscategory/${item.photo}`}
                    alt=''
                    style={{ width: '150px', height: '150px', borderRadius:'50px' }}
                    // className='rounded-circle'
                  />
                  <br />
                  <h5><strong>Name:</strong> {item.petname}</h5>
                  <h5><strong>breedtype:</strong> {item.breedtype}</h5>
                  <h5><strong>status:</strong> {item.status}</h5>
                </Typography>
              )}
            </CardContent>
            <CardActions style={{ alignContent: 'center', marginLeft: '50px' }}>
              {selectedCategoryId === item._id && isEditing ? (
                <>
                  <center>
                    <Button onClick={handleUpdate} startIcon={<SaveIcon />}>
                      {/* Update */}
                    </Button>
                    <Button onClick={handleCancelEdit} startIcon={<CancelIcon />}>
                      {/* Cancel */}
                    </Button>
                  </center>
                </>
              ) : (
                <>
                  <center>
                    <Button onClick={() => handleEdit(item)} startIcon={<EditIcon />}>
                      {/* Edit */}
                    </Button>
                    <Button type='button' onClick={() => handleDelete(item)} startIcon={<DeleteIcon />}>
                      {/* Delete */}
                    </Button>
                  </center>
                </>
              )}
            </CardActions>
          </Card>
      )) : (<>
        <tr>
          <td colSpan="7">
            <center>
              <div style={{ background: 'white', width: '1400px',height:'50px', borderRadius: '10px' }}>
                <p style={{ display: 'flex', margin: '10px 600px',height:'50px', fontFamily: 'fantasy' }}>No result found!</p>
              </div>
            </center>
          </td>
        </tr>
      </>)}
      </div>
    </>
  );
}

