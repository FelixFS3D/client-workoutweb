import React from 'react'
import NavBar from '../Components/NavBar'
import Chrono from '../Components/Chrono'

function Training() {
  return (
    <div >
      <NavBar />
      <div className='green-background'>
        <div className='black-area'>
      <h1>Training<span>Mode</span></h1>
      <Chrono />
      </div>
      </div>
    </div>
  )
}

export default Training
