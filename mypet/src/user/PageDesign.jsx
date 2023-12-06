import React, { useState, useEffect } from 'react';
import { Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './PageDesign.css';
import DogImg from '../assets/img/dogs/dog-contact.png';
import Logo from '../assets/img/logo-white.svg';import { useNavigate } from 'react-router-dom';


import dogImage1 from '../assets/dog-categ-1.png'; 
import dogImage2 from '../assets/cat-categ-1.png';
import dogImage3 from '../assets/rab-categ-1.png';
import dogImage4 from '../assets/parrot-categ-1.png';

import dogSlide1 from '../assets/img/dogs/dog-slide-1.png';
import dogSlide2 from '../assets/img/dogs/dog-slide-2.png';
import dogSlide3 from '../assets/img/dogs/dog-slide-3.png';
import dogSlide4 from '../assets/img/dogs/dog-slide-4.png';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const itemData = [
  { title: 'Quality Care Package', subtitle: 'Quality care for your furry friends', image: dogSlide1 },
  { title: 'Grooming Excellence', subtitle: 'Professional grooming services', image: dogSlide2 },
  { title: 'Expert Pet Care Team', subtitle: 'Experienced pet caregivers at your service', image: dogSlide3 },
  { title: 'Transformative Grooming Experience', subtitle: 'Transform your pet with our grooming expertise', image: dogSlide4 },
];

const bundleData = [
  {
    id: 1,
    name: 'Dog',
    // image: "https://i.ibb.co/pWkvDfR/dog-categ-1.png",
    image:dogImage1,
    services: [
      {
        name: 'Custom Groom',
        price: 2000,
       list: [
         'Spa Bath, Ear cleaning, nail trim', 'Face, Feet and Fanny trim',
        'Gland expression (if needed)', 'Complimentary bows or bandana'
        ],
      },
      {
        name: 'Mini Groom',
        price: 1500,
        list: [
          'Bath, blowdry, brushing', 'Ear cleaning, Custom haircut', 'Nail trim, gland expression',
          'Complimentary bows or bandana',
        ],
      },
      {
        name: 'Basic Groom',
        price: 1000,
        list:[,
           'Bath, blowdry, brushing', 'Ear cleaning, gland expression',
           'No fuss haircut,nail trim,','Complimentary bows or bandana'
        ],
      },
      {
        name: 'Spa Bath',
        price: 1000,
        list: [
           'Bath, blowdry, brushing', 'Ear cleaning, nail trim', 'gland expression (if needed)', 'Complimentary bows or bandana',
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Cat',
    // image: "https://i.ibb.co/5YX4kmP/dog-categ-2.png",
    image:dogImage2,
    services: [
      {
        name: 'Custom Groom',
        price: 2000,
        list: [
         'Spa Bath, Ear cleaning, nail trim', 'Face, Feet and Fanny trim',
        'Gland expression (if needed)', 'Complimentary bows or bandana'
        ],
      },
      {
        name: 'Mini Groom',
        price: 1500,
        list: [
          'Bath, blowdry, brushing', 'Ear cleaning, Custom haircut', 'Nail trim, gland expression',
          'Complimentary bows or bandana',
        ],
      },
      {
        name: 'Basic Groom',
        price: 1000,
       list:[,
           'Bath, blowdry, brushing', 'Ear cleaning, gland expression',
           'No fuss haircut,nail trim,','Complimentary bows or bandana'
        ],
      },
      {
        name: 'Spa Bath',
        price: 1000,
        list: [
           'Bath, blowdry, brushing', 'Ear cleaning, nail trim', 'gland expression (if needed)', 'Complimentary bows or bandana',
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Rabbit',
    // image: "https://i.ibb.co/34bYRm3/dog-categ-3.png",
    image:dogImage3,
    services: [
      {
        name: 'Custom Groom',
        price: 2000,
        list: [
         'Spa Bath, Ear cleaning, nail trim', 'Face, Feet and Fanny trim',
        'Gland expression (if needed)', 'Complimentary bows or bandana'
        ],
      },
      {
        name: 'Mini Groom',
        price: 1500,
        list: [
          'Bath, blowdry, brushing', 'Ear cleaning, Custom haircut', 'Nail trim, gland expression',
          'Complimentary bows or bandana',
        ],
      },
      {
        name: 'Basic Groom',
        price: 1000,
       list:[,
           'Bath, blowdry, brushing', 'Ear cleaning, gland expression',
           'No fuss haircut,nail trim,','Complimentary bows or bandana'
        ],
      },
      {
        name: 'Spa Bath',
        price: 1000,
        list: [
           'Bath, blowdry, brushing', 'Ear cleaning, nail trim', 'gland expression (if needed)', 'Complimentary bows or bandana',
        ],
      },
    ],
  },
  {
    id: 4,
    name:'Birds',
    // image: "https://i.ibb.co/sWCMsv4/dog-categ-4.png",
    image: dogImage4,
    services: [
      {
        name: 'Custom Groom',
        price: 2000,
        list: [
         'Spa Bath, Ear cleaning, nail trim', 'Face, Feet and Fanny trim',
        'Gland expression (if needed)', 'Complimentary bows or bandana'
        ],
      },
      {
        name: 'Mini Groom',
        price: 1500,
        list: [
          'Bath, blowdry, brushing', 'Ear cleaning, Custom haircut', 'Nail trim, gland expression',
          'Complimentary bows or bandana',
        ],
      },
      {
        name: 'Basic Groom',
        price: 1000,
       list:[,
           'Bath, blowdry, brushing', 'Ear cleaning, gland expression',
           'No fuss haircut,nail trim,','Complimentary bows or bandana'
        ],
      },
      {
        name: 'Spa Bath',
        price: 1000,
        list: [
           'Bath, blowdry, brushing', 'Ear cleaning, nail trim', 'gland expression (if needed)', 'Complimentary bows or bandana',
        ],
      },
    ],
  },
];

export default function PageDesign() {
  const [bg, setBg] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [index, setIndex] = useState(0);const [users, setUsers] = useState(''); 

  const nav = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('Login') === null) {
      nav('/');
    } else {
      setUsers(JSON.parse(localStorage.getItem('Login')));
    }
  }, [users]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setBg(true) : setBg(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide < itemData.length - 1 ? prevSlide + 1 : 0));
    }, 3000); // 3 seconds in milliseconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide < itemData.length - 1 ? prevSlide + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : itemData.length - 1));
  };

  const [bundles, setBundles] = useState([]);
  
  useEffect(() => {
    setBundles(bundleData[0].services)
  })

  const getBundle = (name) => {
    const newBundle = bundleData.find((bundle) => {
      return bundle.name === name;
    })
    setBundles(newBundle.services)
  }

  return (
    <>
      <div>
        <Main>
          <div className='container'>
            <div className='slider-controls'>
              <Button onClick={prevSlide}>
              <ChevronLeftIcon />
              </Button>
            </div>
            <div style={{marginTop:'60px'}}>
              <h2>{itemData[currentSlide].title}</h2>
              <br />
              <h4>{itemData[currentSlide].subtitle}</h4>
              <br />
              <Link to='/ViewService'>
                <button className='btn'>
                  <h5>Get an appointment</h5>
                </button>
              </Link>
              <br />
            </div>
            <div  style={{margin:'80px 10px 0px 200px '}}>
            <img src={itemData[currentSlide].image} alt={`Dog ${index + 1}`} style={{ width: '250px', height: '250px', margin:'30px 20px' }} />
            </div>
            <div className='slider-controls'>
              <Button onClick={nextSlide}>
              <ChevronRightIcon />
              </Button>
            </div>
           
          </div>
        </Main>

        <section className='prices-section'>
          <div className='pricecontainer '>
            <div className='pricetext-center'>
              <div className='pricetext-orange '>Our Prices</div>
              <h2 className='h2 mb-3'>Our Services</h2>
              <p className='text-lg text-blue'>Choose your Pet category</p>
            </div>
            <div className='grid-container'>
              {bundleData.map((item, idx) => (
                <div
                  onClick={() => {
                    setIndex(idx);
                    getBundle(item.name);
                  }}
                  className={`grid-item ${index === idx ? 'active' : ''}`}
                  key={idx}
                >
                  <div className='image-container'>
                    <img className='image' src={item.image} alt={item.name} />
                  </div>
                  <h3 className='bundleData-names'>{item.name}</h3>
                  {/* <div className='category-text'>{item.Category}</div> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className='flex-container'>
        {bundles.map((bundle, idx) => (
          <div key={idx} className='bundle-item'>
            <div className='bundle-price'>₹{bundle.price}</div>
            <div className='bundle-name'>{bundle.name}</div>
            <div className='bundle-list'>
              {bundle.list.map((item, index) => (
                <div key={index} className='flex'>
                  <BsCheckCircleFill className='bundle-text' />
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
      <section className='bg-Contact'>
      <div className='Contactcontainer'>
          {/* image  */}
          <div className='Contactorder'>
            <img className='mb-Contact' src={DogImg} alt="Dog" />
          </div>
          {/* text  */}
          <div className='Contactflex' style={{display:'flex'}}>
            <div className='Contacttext-orange '>Contact Us</div>
            <div className='Contacttext-blue'>Phone: +91 000 10 84 000</div>
            <div className='mb-7 Contacttext-blue'>Opening Hours: Mon - Sun: 10 am - 6pm</div>
            <div className='mb-7 Contacttext-blue'>Address: Hampankatta, Manglore</div>
            <Link to='/ViewService'><button className='btn'>Get an appointment</button></Link>
          </div>
        
      </div>
    </section>
      </div>

      <div>
      <footer className='bg-orange'>
      <div className='footercontainer mx-auto'>
        <div className='flex'>
          {/* logo */}
          <a href="#">
            <img src={Logo} alt="Logo" style={{marginLeft:'50px'}} />
          </a>
          {/* copy right text */}
          <div className='text'>
            &copy; Copyright 2023. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
      </div>
      </div>
    </>
  );
}
