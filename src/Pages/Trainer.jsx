import React from 'react'
import NavBar from '../Components/NavBar'
import CreateModalWorkout from '../Components/CreateModalWorkout'
import CreateModalRoutine from '../Components/CreateModalRoutine'


function Trainer() {
  return (
    <div>
      <NavBar />
      <h1>Trainer Area</h1>
      <br />
      <h3>Create Workouts</h3>
      <CreateModalWorkout />
      <br />
      <h3>Create Routines</h3>
      <CreateModalRoutine />
    </div>
  )
}

export default Trainer
