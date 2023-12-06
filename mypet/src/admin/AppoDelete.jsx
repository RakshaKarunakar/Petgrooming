import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppoDelete({ SelectUser, Deletes, setDelFr }) {
    console.log(SelectUser);

    const Delete = async (item) => {
        try {
            Deletes();
            await Axios.delete(`http://localhost:7000/api/petappointment/delete/${SelectUser._id}`);
            // setDelFr((prev) => !prev);

            // Show success toast
            toast.success(`${SelectUser.ownername} 's Appointment deleted successfully!`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.log(SelectUser.ownername, 'SelectUser.ownername');
        } catch (error) {
            console.log('error', error);
            toast.error(`Error deleting ${SelectUser.ownername} 's Appointment. Please try again.`, {
                // toast.success(`${SelectUser.ownername} deleted successfully!`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div>
            <>
                <Card sx={{ maxWidth: '500px', height: '200px' }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <h4>Are you sure you want to delete {SelectUser.name}!!! </h4>
                            <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={Deletes}>
                            Close
                        </Button>
                        <Button size="small" onClick={() => Delete(SelectUser)}>
                            yes Delete
                        </Button>
                    </CardActions>
                </Card>
            </>
        </div>
    );
}
