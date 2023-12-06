import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AppoUpdate from './AppoUpdate';
import AppoDelete from './AppoDelete';
import AppoView from './AppoView';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

const itemsPerPage = 15;

export default function ViewAppointment({ setCurrentPage }) {
  const [viewState, setViewState] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState({ appointment_date: '' });
  const [SelectUser, setSelectUser] = useState('');
  const [open, setOpen] = useState(false);
  const [Upopen, setUpopen] = useState(false);
  const [selectdelete, setSelectDelete] = useState(false);
  const [currentPage, setCurrentPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get('http://localhost:7000/api/petappointment/aview')
      .then((res) => {
        const data = res.data;
        setViewState(data);
      })
      .catch((error) => {
        console.error('Appointment View Error', error);
      });
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  const handleOpen = (item) => {
    setOpen(true);
    setSelectUser(item);
  };

  const handleClose = () => setOpen(false);

  const handleUpopen = (item) => {
    setUpopen(true);
    setSelectUser(item);
  };

  const handleUpclose = () => {
    setUpopen(false);
  };

  const handleDelete = (item) => {
    setSelectDelete(true);
    setSelectUser(item);
  };

  const handleDeletes = () => {
    setSelectDelete(false);
  };

  const calculateTotalPrice = (item) => {
    const appointmentPrice = item?.price || 0;
    const totalPrice = item.service_id?.price + appointmentPrice;
    return totalPrice.toFixed(2);
  };

  const handlePageClick = (data) => {
    setCurrentPages(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = viewState
    .filter((item) =>
      item.ownername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pet_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) =>
        !dateFilter.appointment_date ||
        new Date(item.appointment_date).toISOString().split('T')[0] === dateFilter.appointment_date
    )
    .slice(offset, offset + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Completed':
        return 'blue';
      default:
        return 'black';
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
  };

  return (
    <>
      <div style={{ backgroundColor: 'orange', height: '700px', width: '100%' }}>
        <center>
          <br />
          <h3 style={{ marginTop: '40px' }}>APPOINTMENT DETAILS</h3>
          <ToastContainer />
        </center>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', alignItems: 'center', backgroundColor: 'orange' }}>
          <div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              style={{ margin: '20px 10px 20px 300px', height: '50px', backgroundColor: 'white', borderRadius: '10px', maxWidth: '300px' }}
              type="search"
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <SearchIcon style={{ cursor: 'pointer' }} onClick={() => console.log('Search icon clicked')} />
                ),
              }}
            />
            <Button
              className="btn btn-primary"
              style={{ margin: '20px 0', height: '50px', backgroundColor: 'white', borderRadius: '10px', maxWidth: '10px', marginRight: '4px' }}
              onClick={() => setSearchTerm('')}
            >
              Reset
            </Button>
          </div>

          <TextField
            type="date"
            size="small"
            label="Appointment Date"
            sx={{ margin: '0px 200px 0px 0px', backgroundColor: 'white', borderRadius: '10px', minWidth: '300px' }}
            value={dateFilter.appointment_date}
            onChange={(e) => setDateFilter({ ...dateFilter, appointment_date: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <hr />

        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', marginTop: '50px', margin: '0px 10px 0px 10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: 'lightgray', height: '50px' }}>
                <th>Owner Name</th>
                <th>Phone</th>
                <th>Appointment Date</th>
                <th>Service</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.length > 0 ? paginatedData.map((item, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white', height: '50px' }}>
                  <td style={{ margin: '10px' }}>{item?.ownername}</td>
                  <td style={{ margin: '10px' }}>{item?.phone}</td>
                  <td style={{ margin: '10px' }}>{formatDateTime(item?.appointment_date)}</td>
                  <td style={{ margin: '10px' }}>{item?.service_id?.servicename}</td>
                  <td style={{ margin: '10px' }}>{item?.category_id?.petname}-{item?.category_id?.breedtype}</td>
                  <td style={{ margin: '10px' }}>₹{calculateTotalPrice(item)}</td>
                  <td style={{ margin: '10px', color: getStatusColor(item?.status) }}>{item?.status}</td>
                  <th>
                    <Button
                      type="button"
                      color="primary"
                      size="small"
                      onClick={() => handleOpen(item)}
                      style={{ minWidth: 'unset', marginRight: '4px' }}
                      startIcon={<RemoveRedEyeIcon />}
                    ></Button>

                    <Button
                      color="success"
                      size="small"
                      onClick={() => handleUpopen(item)}
                      style={{ minWidth: 'unset', marginRight: '4px' }}
                      startIcon={<EditSharpIcon />}
                    ></Button>

                    <Button
                      type="button"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item)}
                      style={{ minWidth: 'unset' }}
                      startIcon={<DeleteIcon />}
                    ></Button>
                  </th>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7">
                    <center>
                      <div style={{ background: 'white', width: '1400px', height: '50px', borderRadius: '10px' }}>
                        <p style={{ display: 'flex', margin: '0px 600px', padding: '10px', fontFamily: 'fantasy' }}>No result found!</p>
                      </div>
                    </center>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div><br /><hr />

        <div>
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <AppoView SelectUser={SelectUser} Close={handleClose} calculateTotalPrice={calculateTotalPrice(SelectUser)} />
            </Box>
          </Modal>
        </div>

        <div>
          <Modal open={selectdelete} onClose={handleDeletes} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <AppoDelete SelectUser={SelectUser} Deletes={handleDeletes} />
            </Box>
          </Modal>
        </div>

        <div>
          <Modal open={Upopen} onClose={handleUpclose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <AppoUpdate setUpopen={setUpopen} SelectUser={SelectUser} Close={handleUpclose} />
            </Box>
          </Modal>
        </div>

        <ReactPaginate
          previousLabel={<KeyboardArrowLeftIcon />}
          nextLabel={<KeyboardArrowRightIcon />}
          breakLabel={'...'}
          breakLabelClassName={'break-me'}
          pageCount={Math.ceil(viewState.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakLinkClassName={'page-link'}
          pageClassName={'page-item'} // Use pageClassName for page items styling
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          breakClassName={'page-item'}
        />
        <br />
      </div>
    </>
  );
};
