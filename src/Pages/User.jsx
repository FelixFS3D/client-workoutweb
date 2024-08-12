import React from 'react'
import NavBar from '../Components/NavBar'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate()
  const handleNavigate = async () => {
    navigate("/routines")
  }
  return (
    <div>
      <NavBar />
      <h1>User Area</h1>
      <br />
      <h3>Add Routines</h3>
      <div className='user-routines-container'>
        
      </div>
      <Button variant="outlined" onClick={handleNavigate}>Add New Routines</Button>
    </div>
  )
}

export default User
