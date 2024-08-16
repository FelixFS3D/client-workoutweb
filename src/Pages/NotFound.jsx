import React from 'react'
import NavBar from '../Components/NavBar'
import fotoNotFound from "../../src/images/Gimnasio vacio.jpg"

function NotFound() {
  return (
    <div>
      <div className='pic-error' style={{
          backgroundImage: `url(${fotoNotFound})`}}>
      <NavBar />
      <h1>Not<span id='green'>Found</span></h1>
      <h2>Opps! Seems you are in a wrong place! Go back home.</h2>
      </div>
    </div>
  )
}

export default NotFound
