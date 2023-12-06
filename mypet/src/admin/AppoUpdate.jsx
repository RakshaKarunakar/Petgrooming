import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function AppoUpdate(props) {
  const [updatedData, setUpdatedData] = useState({ ...props.SelectUser });
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selCategory, setSelCategory] = useState('');
  const [selser, setSelser] = useState('');

  const handleSave = () => {
    Axios.put(`http://localhost:7000/api/petappointment/update/${props.SelectUser._id}`, updatedData)
      .then(async (res) => {
        console.log('Update successful', res);
        toast.success('Update is Successful', {
          // autoClose: false,
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: false,
          draggable: false,
          closeButton: true,
          progressClassName: styles.toastProgress,
        });
        await props.setUpopen(false);
      })
      .catch((error) => {
        console.error('Update Error', error);
        toast.error('Failed to update. Please try again.', {
          // autoClose: false,
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: false,
          draggable: false,
          closeButton: true,
          progressClassName: styles.toastProgress,
        });
      });
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Fetch category data
    Axios.get('http://localhost:7000/api/petcategory/view')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error('Category View Error', error);
      });

    // Fetch service data
    Axios.get('http://localhost:7000/api/petservice/view')
      .then((res) => {
        setServices(res.data);
      })
      .catch((error) => {
        console.error('Service View Error', error);
      });
  }, []);

  return (
    <> <ToastContainer />
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <TextField
            label="Owner Name"
            fullWidth
            margin="normal"
            name="ownername"
            variant="outlined"
            value={updatedData.ownername}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            name="phone"
            variant="outlined"
            value={updatedData.phone}
            onChange={handleChange}
          />
          <TextField
            label="Notes"
            fullWidth
            margin="normal"
            name="notes"
            variant="outlined"
            value={updatedData.notes}
            onChange={handleChange}
          />
          <TextField
            label="Appointment Date"
            fullWidth
            type="datetime-local"
            margin="normal"
            name="appointment_date"
            variant="outlined"
            value={updatedData.appointment_date}
            onChange={handleChange}
          />
          <Tooltip title="Category name">
            <TextField
              fullWidth
              label="Category name"
              margin="normal"
              name="category_id"
              variant="outlined"
              value={selCategory || updatedData.category_id.breedtype}
              onChange={(e) => {
                setSelCategory(e.target.value);
                handleChange(e);
              }}
              select
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id} disabled={cat.status === 'Unavailable'}>
                  {cat.status === 'Unavailable' ? cat.petname : `${cat.petname}-${cat.breedtype}`}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
          <br />
          <Tooltip title="Servicename">
            <TextField
              fullWidth
              label="Servicename"
              margin="normal"
              name="service_id"
              variant="outlined"
              value={selser || updatedData?.service_id?.servicename}
              onChange={(e) => {
                setSelser(e.target.value);
                handleChange(e);
              }}
              select
            >
              {services.map((service) => (
                service.status !== 'Unavailable' && (
                  <MenuItem key={service._id} value={service._id}>
                    {service?.servicename}
                  </MenuItem>
                )
              ))}
            </TextField>
          </Tooltip>
          <br />
          <TextField
            label="Additional Price"
            fullWidth
            margin="normal"
            name="price"
            variant="outlined"
            value={updatedData.price}
            onChange={handleChange}
          />
          <br />
          <Tooltip title="Status">
            <TextField
              label="Status"
              fullWidth
              margin="normal"
              name="status"
              variant="outlined"
              value={updatedData.status}
              onChange={handleChange}
              select
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
          </Tooltip>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button size="small" className="btn btn-info m-2" onClick={props.Close}>
            Close
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

const styles = {
  toastProgress: {
    backgroundColor: '#3498db', 
  },
};