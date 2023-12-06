import React, { useState, useEffect } from 'react';
import './PageDesign.css';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useNavigate } from 'react-router-dom';
import { CgMenuRight } from 'react-icons/cg';
import { Button, Modal, Box } from '@mui/material';
import Logo from '../assets/img/logo.svg';
import Userprofile from './UserProfile';

const navigation = [
  {
    name: 'HOME',
    href: '/UserPage',
    icon: <HomeIcon />,
  },
  {
    name: 'GET APPOINTMENT',
    href: '/ViewService',
    icon: <VisibilityIcon />,
  },
  {
    name: 'MY APPOINTMENT',
    href: '/AppointmentStatus',
    icon: <ScheduleIcon />,
  },
  {
    name: 'SIGN OUT',
    onClick: 'logout',
    icon: <LogoutIcon />,
  },
];

export default function Userheader() {
  const nav = useNavigate();
  const [users, setUsers] = useState('');
  const [bg, setBg] = useState(false);
  const [navMobile, setNavMobile] = useState(false);
  const [userDataModalOpen, setUserDataModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('Login') === null) {
      nav('/');
    } else {
      setUsers(JSON.parse(localStorage.getItem('Login')));
    }

    // Scroll event listener
    const handleScroll = () => {
      window.scrollY > 50 ? setBg(true) : setBg(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nav, setUsers]);

  const handleNavigation = (item) => {
    if (item.href) {
      navigate(item.href);
    } else if (item.onClick === 'logout') {
      localStorage.removeItem('Login');
      nav('/');
    }
    setNavMobile(false); // Close the mobile navigation after clicking a link
  };

  const userData = JSON.parse(localStorage.getItem('User')) || {}; // Use an empty object as a default value

  const handleUserDataModalOpen = () => {
    setUserDataModalOpen(true);
  };

  const handleUserDataModalClose = () => {
    setUserDataModalOpen(false);
  };

  return (
    <>
      <div>
        <header className={`header ${bg ? 'bg-white' : 'bg-none'}`} >
          <div className="header.container logo" style={{ margin: '10px 100px 10px 100px' }}>
            <a href="#">
              <img src={Logo} alt="" />
              <h5 style={{ textAlign: 'center', color: 'blue' }}>GROOMING_HAVEN</h5>
            </a>
          </div>
          <div className="nav hidden lg:flex" style={{ margin: '10px 50px 10px 50px' }}>
            <nav className="navigation">
              {navigation.map((item, index) => (
                <a
                  key={index}
                  className="navigation-link spaced-text"
                  onClick={() => handleNavigation(item)}
                >
                  {item.icon}{item.name}
                </a>
              ))}
            </nav>
          </div>
          <br />

          <div className='Userprofile'>
            <Button onClick={handleUserDataModalOpen}>
              <img
                src={`http://localhost:7000/uploaduserphotos/${userData?.photo}`}
                alt=""
                className="rounded-circle"
                style={{ width: '80px', height: '80px', margin: '0px 50px' }}
              />
            </Button>
          </div>

          <div onClick={() => setNavMobile(!navMobile)} className='mobile-nav-button lg:hidden'>
            <CgMenuRight className='text-blue text-3xl' />
          </div>
        </header>
        <div className={`${navMobile ? 'max-h-h' : 'max-h-h'} navMobile`}> {navMobile && (
          <div className="mobile-nav lg:hidden">
            <nav className="navigation">
              {navigation.map((item, index) => (
                <a
                  key={index}
                  className="navigation-link spaced-text"
                  onClick={() => handleNavigation(item)} style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {item.icon}{item.name}
                </a>
              ))}
            </nav>
      </div>
)}</div>
      </div >
      <div>
        <Modal
          open={userDataModalOpen}
          onClose={handleUserDataModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '30%',
            left: '88%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 'auto',
            bgcolor: 'background.paper',
            p: 4,
          }}>
            <div>
              <Userprofile handleUserDataModalClose={handleUserDataModalClose} />
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
