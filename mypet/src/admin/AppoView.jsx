import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios';

export default function AppoView({ SelectUser, Close, calculateTotalPrice }) {
    const [Sview, setSview] = useState()

    useEffect(() => {
        Axios.get(`http://localhost:7000/api/petappointment/aview/${SelectUser._id}`)
            .then((res) => {
                setSview(res.data)  //res,data syntax
            })
            .catch((error) => {
                console.error('View Error', error)
            })
    }, [])

    function formatDateTime(dateTimeString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateTimeString).toLocaleString(undefined, options);
    }

    return (
        <>
            <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <h6><strong>Owner Name: </strong>   {SelectUser.ownername}</h6><br />
                        <h6><strong>Phone: </strong>  {SelectUser.phone}</h6><br />
                        <h6><strong>Pet Name:</strong> {SelectUser.pet_name}</h6><br />
                        <h6><strong>Pet Age:</strong>  {SelectUser.pet_age}</h6><br />
                        <h6><strong>Appointment Date:</strong> {formatDateTime(SelectUser.appointment_date)}</h6><br />
                        <h6><strong>Service:</strong>   {SelectUser.service_id?.servicename}</h6><br />
                        <h6><strong>Category:</strong> {SelectUser.category_id?.breedtype}-{SelectUser.category_id?.petname}</h6><br />
                        <h6><strong>Notes:</strong>  {SelectUser.notes}</h6><br />
                        <h6><strong>Price:</strong> ₹{calculateTotalPrice}</h6><br />
                        <h6><strong>Status:</strong> {SelectUser.status}</h6>
                    </Typography>
                    <CardActions>
                        <Button size="small" className="btn btn-info m-2" onClick={Close}> Close</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </>
    );
}
