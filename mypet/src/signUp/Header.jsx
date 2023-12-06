import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgMenuRight } from 'react-icons/cg';
import Logo from '../assets/img/logo.svg';
import PhoneIcon from '../assets/img/phone.svg';
import './Homepage.css'

const navigation = [
  {
    name: 'Homepage',
    href: '/',
  },
  {
    name: '-',
    href: '/User_Register',
  },
  {
    name: 'Are you Admin?',
    href: '/AdminSignin',
  },
  {
    name: '-',
    href: '/Admin_Register',
  },
];

const Header = () => {
  const [bg, setBg] = useState(false);
  const [navMobile, setNavMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setBg(true) : setBg(false);
    });
  }, []);

  const handleNavigation = (href) => {
    navigate(href);
    setNavMobile(false); // Close the mobile navigation after clicking a link
  };

  return (
    <>
      <div>
        <header className={`header ${bg ? 'bg-white' : 'bg-none'}`}>
          <div className="header.container logo" style={{ margin: '10px 200px 10px 100px' }}>
            <div>
              <img src={Logo} alt="" />
              <h5 style={{ textAlign: 'center', color: 'blue' }}>GROOMING_HAVEN</h5>
            </div>
          </div>
          <div className='nav hidden lg:flex' style={{ margin: '10px 0px 10px 20px' }}>
            <nav className="navigation" href="#">
              {navigation.map((item, index) => (
                <a
                  key={index}
                  role="button"
                  className="navigation-link spaced-text"
                  onClick={() => handleNavigation(item.href)}
                  tabIndex={0} // This makes it focusable, making it more accessible
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div><br />

          <div className="program">
            {/* Phone icon & phone number */}
            <div className="flex " style={{ display: 'flex' }}>
              <img className="phone-icon" src={PhoneIcon} alt="" />
              <div className="opening-contact-desktop lg" style={{ marginRight: '10px' }}>Contact: </div>
              <div className="phone-number">+91 000 10 84 000</div>
            </div>

            <div className="text-sm">
              {/* Show only in desktop mode */}
              <div className="opening-hours-desktop lg" style={{ display: 'flex' }}>
                <p style={{ marginRight: '10px' }}>Opening Hours: </p>
                <p className="phone-number"> Mon - Sun: 10am - 6am</p>
              </div>
              {/* Show only in mobile mode */}
              <div className="opening-hours-mobile lg">Mon - Sun: 10am - 6pm</div>
            </div>
          </div>

          <div onClick={() => setNavMobile(!navMobile)} className='mobile-nav-button lg:hidden'>
            <CgMenuRight className='text-blue text-3xl' />
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
