import React, { useState, useEffect } from 'react';
import Userheader from './Userheader'
import PageDesign from './PageDesign'
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const [users, setUsers] = useState(''); 

  const nav = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('Login') === null) {
      nav('/');
    } else {
      setUsers(JSON.parse(localStorage.getItem('Login')));
    }
  }, [users]);

  return (
    <>
      <div>
        <div>
        <Userheader />
        </div>
        <div>
          <PageDesign />
        </div>
      </div>
    </>
  )
}
