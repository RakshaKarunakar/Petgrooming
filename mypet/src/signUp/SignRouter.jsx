import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserRegister from "./UserRegister"
import AdminRegister from "./AdminRegister"
import UserSignin from "./UserSignin"
import Dashboard from "../admin/Dashboard"
import UserPage from "../user/UserPage"
import Homepage from "./Homepage"
import AdminSignin from "./AdminSignin"
import Userheader from '../user/Userheader'
import ViewService from '../user/ViewService'
import AppointmentStatus from '../user/AppointmentStatus'
import AppointmentForm from '../user/AppointmentForm'
import ForgotPassword from './ForgotPassword'
import Adminpassreset from './Adminpassreset'


export default function SignRouter() {
  return (
    <div>
        <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Homepage />} />
          <Route exact path='/User_Register' element={<UserRegister />} />
          <Route exact path='/Admin_Register' element={<AdminRegister />} />
          <Route exact path='/UserSignin' element={<UserSignin />} />
          <Route exact path='/AdminSignin' element={<AdminSignin />} />
          <Route exact path='/Dashboard' element={<Dashboard />} />
          <Route exact path='/UserPage' element={<UserPage />} />
          <Route exact path='/Userheader' element={<Userheader />} />
          <Route exact path='/ViewService' element={<ViewService />} />
          <Route exact path='/AppointmentStatus' element={<AppointmentStatus />} />
          <Route exact path='/AppointmentForm' element={<AppointmentForm />} />
          <Route exact path='/Adminpassreset' element={<Adminpassreset />} />
          <Route exact path='/ForgotPassword' element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
  </div>
  )
}
