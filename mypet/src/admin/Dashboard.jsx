import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PetsIcon from '@mui/icons-material/Pets';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PeopleIcon from '@mui/icons-material/People';
import FeedIcon from '@mui/icons-material/Feed';
import CategoryForm from "./CategoryForm"
import CategoryCard from "./CategoryCard"
import ServiceForm from "./ServiceForm"
import ServiceCard from "./ServiceCard"
import ViewAppointment from "./Viewappointment"
import ViewFeedback from "./ViewFeedback"
import Userprofiledata from './Userprofiledata'
import Dashcontent from './Dashcontent'
import { Button, Modal, Box } from '@mui/material';
import { purple } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate } from 'react-router-dom';
// import { IconContext } from 'react-icons';
import Adminprofile from './Adminprofile';
import Logo from '../assets/img/logo-white.svg';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [users, setUsers] = useState('');

  useEffect(() => {
    if (localStorage.getItem('Login') === null) {
      nav('/');
    } else {
      setUsers(JSON.parse(localStorage.getItem('Login')));
    }
  }, [users]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('Login');
    nav('/');
  };

  const userData = JSON.parse(localStorage.getItem('admin')) || {}; // Use an empty object as a default value
  const [userDataModalOpen, setUserDataModalOpen] = useState(false);

  const handleUserDataModalOpen = () => {
    setUserDataModalOpen(true);
  };

  const handleUserDataModalClose = () => {
    setUserDataModalOpen(false);
  };

  // Render the component based on the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashcontent setCurrentPage={setCurrentPage} />;
      case 'ViewAppointment':
        return <ViewAppointment setCurrentPage={setCurrentPage} />;
      case 'ViewFeedback':
        return <ViewFeedback setCurrentPage={setCurrentPage} />;
      case 'ServiceCard':
        return <ServiceCard setCurrentPage={setCurrentPage} />;
      case 'CategoryCard':
        return <CategoryCard setCurrentPage={setCurrentPage} />;
      case 'Userprofiledata':
        return <Userprofiledata setCurrentPage={setCurrentPage} />;
      case 'ServiceForm':
        return <ServiceForm setCurrentPage={setCurrentPage} />;
      case 'CategoryForm':
        return <CategoryForm setCurrentPage={setCurrentPage} />;
      default:
        return <ViewAppointment />;
    }
  };

  // mainListItems the component used in sidebar
  const mainListItems = (
    <React.Fragment>
      <ListItemButton onClick={() => setCurrentPage('Dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => setCurrentPage('ViewAppointment')}>
        <ListItemIcon>
          <EventNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Appointments" />
      </ListItemButton>
      <ListItemButton onClick={() => setCurrentPage('ViewFeedback')}>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Feedbacks" />
      </ListItemButton>
      <ListItemButton onClick={() => setCurrentPage('ServiceCard')}>
        <ListItemIcon>
          <ContentCutIcon />
        </ListItemIcon>
        <ListItemText primary="Services" />
      </ListItemButton>
      <ListItemButton onClick={() => setCurrentPage('CategoryCard')}>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
      <ListItemButton onClick={() => setCurrentPage('Userprofiledata')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users Profile" />
      </ListItemButton>
      <ListItemButton onClick={() => setCurrentPage('ServiceForm')}>
        <ListItemIcon>
          <FeedIcon />
        </ListItemIcon>
        <ListItemText primary=" Add Service" />
      </ListItemButton>
      <ListItemButton onClick={() => setCurrentPage('CategoryForm')}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Add Category" />
      </ListItemButton>
    </React.Fragment>)

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', backgroundColor: '#060b26' // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                <div style={{ display: 'flex', margin: '10px 10px 0px 0px' }}>
                  <a href="#">
                    <img src={Logo} alt="" />
                  </a>
                  <h5 style={{ textAlign: 'center', color: 'white', margin: '20px 20px 20px 20px' }}>GROOMING_HAVEN</h5>
                </div>
              </Typography>
              <IconButton color="inherit">

                <div style={{ marginLeft: '10px' }}>
                  <Button onClick={handleUserDataModalOpen}>  <img src={`http://localhost:7000/uploadadminphoto/${userData.photo}`}
                    alt="" className="rounded-circle" style={{ width: '80px', height: '80px', margin: '0px 10px', }} /></Button >
                  <Button type='button' size='max' onClick={handleLogout} style={{ margin: '0px 20px' }}
                    startIcon={<LogoutIcon sx={{ color: purple[500], fontSize: 25, alignItems: 'center' }} />} > LOG OUT</Button>
                </div>
              </IconButton>
            </Toolbar>
          </AppBar >
          <Drawer variant="permanent" open={open} style={{ marginTop: '50px' }}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <h3>{mainListItems}</h3>
              <Divider sx={{ my: 2 }} />
              {/* {secondaryListItems} */}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: 'orange',
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="1500px" sx={{ mt: 0, mb: 0 }}>
              {renderPage()}
              <Copyright sx={{ pt: 0, marginTop: '100px' }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>

      <div>
        <Modal
          open={userDataModalOpen}
          onClose={handleUserDataModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              left: '88%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 'auto',
              bgcolor: 'background.paper',
              p: 4,
            }}
          >
            <div>
              <Adminprofile
                handleUserDataModalClose={() => handleUserDataModalClose()}
              />
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
