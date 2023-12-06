import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button,CardMedia } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewFeedback() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:7000/api/petfeedback/view');
      const sortedFeedback = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFeedback(sortedFeedback);
      console.log('Sorted Feedback Data:', sortedFeedback);
    } catch (error) {
      console.error('Feedback View Error', error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const confirmToastId = toast.info('Are you sure you want to delete this feedback?', {
        autoClose: false,
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        draggable: false,
        closeButton: true,
        progressClassName: styles.toastProgress,
      });

      // Wait for the user's response
      await new Promise((resolve) => {
        toast.update(confirmToastId, {
          render: 'Click here to confirm',
          onClick: () => {
            resolve();
            toast.dismiss(confirmToastId);
          },
        });
      });

      // User confirmed
      await Axios.delete(`http://localhost:7000/api/petfeedback/delete/${item._id}`);
      fetchData(); // Refresh data after deletion
      toast.success('Feedback deleted successfully', {
        // autoClose: false,
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        draggable: false,
        closeButton: true,
        progressClassName: styles.toastProgress,
      });
    } catch (error) {
      console.log('Error deleting feedback', error);
      // Handle error appropriately
      toast.error('Failed to delete feedback. Please try again.', {
        autoClose: false,
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        draggable: false,
        closeButton: true,
        progressClassName: styles.toastProgress,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <ToastContainer />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '50px', marginBottom: '100px' }}>
        {feedback.map((item, index) => (
          <div key={index} style={styles.feedbackCard}>
            <div style={styles.cardItem}>
              <p><strong>User name:</strong><br /> {item?.appointment_id?.ownername}</p>
              <hr />
              <strong>Feedback:</strong><br />
              <div style={{ height: '100px', overflowY: 'auto' }}>
                <p style={{ wordWrap: 'break-word' }}>
                  {item?.feedback}
                </p>
              </div>
              <hr />
              <p><strong>Status:</strong><br /> {item?.status}</p>
              <hr />
              <Button onClick={() => handleDelete(item)} startIcon={<DeleteIcon />} style={{ marginLeft: '200px' }}></Button>
            </div>
          </div>
        ))}
      </div>
      <hr />
    </>
  );
}

const styles = {
  feedbackCard: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    margin: '10px 10px 10px 10px ',
    padding: '10px',
    width: '300px',
    // backgroundColor:'white'
  },

  cardItem: {
    width: '300px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '0px',
    padding: '20px',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white'
  },

  cardHeader: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
  },

  cardBody: {
    padding: '10px',
  },

  toastProgress: {
    backgroundColor: '#3498db', // Set the color to match your theme
  },
};
