import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function Dashcontent() {

  const [petCategories, setPetCategories] = useState([]);
  const [petServices, setPetServices] = useState([]);
  const [petAppointments, setPetAppointments] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const categoriesResponse = await Axios.get('http://localhost:7000/api/petcategory/view');
      setPetCategories(categoriesResponse.data);

      const servicesResponse = await Axios.get('http://localhost:7000/api/petservice/view');
      setPetServices(servicesResponse.data);

      const appointmentsResponse = await Axios.get('http://localhost:7000/api/petappointment/aview');
      setPetAppointments(appointmentsResponse.data);

      const feedbackResponse = await Axios.get('http://localhost:7000/api/petfeedback/view');
      const sortedFeedback = feedbackResponse.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFeedback(sortedFeedback);

      const registrationsResponse = await Axios.get('http://localhost:7000/api/petuserregister/view');
      setUserRegistrations(registrationsResponse.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));

    // Update the year when going from December to January
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };


  // Aggregate data based on appointment date
  const appointmentsPerMonth = petAppointments.reduce((acc, appointment) => {
    const month = new Date(appointment.appointment_date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Convert aggregated data to chart format
  const getMonthOrder = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months;
  };

  // Convert aggregated data to chart format and arrange by month order
  const chartData = getMonthOrder().map(month => ({
    month,
    appointments: appointmentsPerMonth[month] || 0,
  }));

  return (
    <div style={{ marginTop: '60px' }}>
      <Grid container spacing={3}>

        <Grid item xs={15} sm={15} md={15} >
          <Card>
            <CardContent>
              <Typography variant="h5" style={{ color: 'orange' }}>Appointments Per Month</Typography>
              <Typography variant="h5" > {petAppointments.length}</Typography>

              {/* Bar Chart to display appointments per month */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>

              <Button onClick={handlePreviousMonth} variant="outlined" sx={{ marginTop: 2 }}>
                {/* Previous Month */}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Dashboard Card 1: Pet Feedback */}
        <Grid item xs={15} sm={10} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" style={{ color: 'orange' }}>Feedbacks</Typography>
              <Typography variant="h5"> {feedback.length}</Typography>
              {/* Additional information or charts related to pet feedback */}
            </CardContent>
          </Card>
        </Grid>

        {/* Dashboard Card 2: User Registrations */}
        <Grid item xs={15} sm={10} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" style={{ color: 'orange' }}>User Registrations</Typography>
              <Typography variant="h5"> {userRegistrations.length}</Typography>
              {/* Additional information or charts related to user registrations */}
            </CardContent>
          </Card>
        </Grid>
        {/* Dashboard Card 3: Pet Categories */}
        <Grid item xs={15} sm={10} md={3} >
          <Card >
            <CardContent >
              <Typography variant="h5" style={{ color: 'orange', }}>Pet Categories</Typography>
              <Typography variant="h5"> {petCategories.length}</Typography>
              {/* Additional information or charts related to pet categories */}
            </CardContent>
          </Card>
        </Grid>


        {/* Dashboard Card 4: Pet Services */}
        <Grid item xs={15} sm={10} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" style={{ color: 'orange' }}>Pet Services</Typography>
              <Typography variant="h5"> {petServices.length}</Typography>
              {/* Additional information or charts related to pet services */}
            </CardContent>
          </Card>
        </Grid>

      </Grid><br /><br />
    </div>
  );
};