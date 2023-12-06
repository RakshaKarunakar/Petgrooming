import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DogImg from '../assets/img/dogs/dog-appointment.png';

export default function CategoryForm({setCurrentPage}) {
  const navigate = useNavigate();

  const [Category, setCategory] = useState({
    petname: '',
    breedtype: '',
    status: 'Available', 
    photo: null,
  });

  const [value, setValue] = useState([]);

  const Click = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleProfile = (e) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      photo: e.target.files[0],
    }));
  };

  const IncrementCount=async()=>{
    setTimeout(async()=>{
      await setCurrentPage('CategoryCard');
    },4000)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('petname', Category.petname);
      formData.append('breedtype', Category.breedtype);
      formData.append('status', Category.status);
      formData.append('photo', Category.photo);

      const response = await Axios.post('http://localhost:7000/api/petcategory/insert', formData);

      if (response.status === 200) {
        const responseData = response.data;
        console.log(responseData, 'responseData');
        toast.success('Data saved successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        IncrementCount();
      
        // Reset form fields after successful submission
        setCategory({
          petname: '',
          breedtype: '',
          status: 'Available',
          photo: null,
        });
      } else {
        console.log('Category not inserted');
      }
    } catch (error) {
      console.error('Error', error);
      toast.error('Failed to save Category. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    const newId = value.length === 0 ? 1 : value[value.length - 1].id + 1;
    const newAdmin = {
      id: newId,
      ...Category,
    };

    const newValue = [...value, newAdmin];
    setValue(newValue);
    navigate('/Dashboard');
  };


  return (
    <>
      <section style={styles.CategorySection}>
        <ToastContainer />
        <center>
          <br />
          <div className="container1 mx-auto">
            {/* Image */}
            <div style={styles.imageContainer}>
              <img src={DogImg} alt="Dog" style={styles.image} />
            </div>
            {/* Form */}
            <form style={styles.formContainer}>
              <br />
              {/* petname, breedtype, image, status */}
              <TextField
                placeholder="Enter Photo"
                type="file"
                name="photo"
                label="Photo"
                sx={{ mr: 1, my: 1, minHeight: '20px', width: '300px' }}
                fullWidth
                required={true}
                onChange={handleProfile}
              />

              <TextField
                placeholder="Enter Pet Name"
                type="text"
                name="petname"
                label="Pet_Name"
                sx={{ mr: 1, my: 1, minHeight: '20px', width: '300px' }}
                required={true}
                onChange={(e) => Click(e)}
                select
              >
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Rabbit">Rabbit</MenuItem>
                <MenuItem value="Bird">Bird</MenuItem>
              </TextField>

              <TextField
                placeholder="Enter Breed Type"
                type="text"
                name="breedtype"
                label="Breed_Type"
                sx={{ mr: 1, my: 1, minHeight: '20px', width: '300px' }}
                required={true}
                onChange={(e) => Click(e)}
              />
              <br />
              <div>
                <center spacing={3} direction="row">
                  <Link to="/CategoryCard">
                    <Button variant="contained" onClick={handleSubmit}>
                      Submit
                    </Button>{' '}
                  </Link>
                </center>
              </div>
            </form>
          </div>
        </center>
      </section>
      <hr />
    </>
  );
}

const styles = {
  CategorySection: {
    background: '#FFD700', // Yellow secondary background color
    padding: '0px 0', // Adjust padding as needed
    marginTop: '40px', // Margin for large screens
    minHeight: '300px', // Minimum height for the section
    position: 'relative',
    height: '700px'
  },
  container: {
    maxWidth: '1000px',
    height: '200px',
    margin: '0 auto',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    /* Add image styling as needed */
  },
  formContainer: {
    background: 'orange', // #FFFF00 Yellow background color for the form
    padding: '10px', // Adjust padding as needed
    maxWidth: '1000px', // Adjust the maximum width as needed
    height: '400px', // Fixed height for the form
    marginBottom: '50px',
    marginTop: '-15px', // Adjust the margin for alignment
    borderRadius: '60px', // Rounded corners
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '5px', // Gap between form elements
  },
  formTitle: {
    fontSize: '24px', // Adjust font size as needed
    paddingTop: '16px', // Adjust top padding for the title
  },
  inputControl: {
    width: '400px',
    borderRadius: '10px',
    height: '40px',
  },
  button: {
    width: '100%',
    maxWidth: '300px',
    background: 'orange',
    borderRadius: '10px'
  },
};
