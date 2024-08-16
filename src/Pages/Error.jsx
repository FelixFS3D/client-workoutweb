import React from 'react'
import NavBar from '../Components/NavBar'
import fotoError from "../../src/images/old-gym.jpg"

function Error() {
  return (
    <div>
      <div className='pic-error' style={{
          backgroundImage: `url(${fotoError})`}}>
      <NavBar />
      <h1>Error<span id='green'>!</span></h1>
      <h2>Something broke in the app... Come back later please"</h2>
      </div>
    </div>
  )
}

export default Error
