import { useState } from 'react'
import Home from "./Pages/Home"
import Signup from "./Pages/Auth/SignUp"
import Login from "./Pages/Auth/Login"
import Workouts from "./Pages/Workouts"
import Routines from "./Pages/Routines"
import Trainer from "./Pages/Trainer"
import User from "./Pages/User"
import Training from "./Pages/Training"

import Error from "./Pages/Error"
import NotFound from "./Pages/NotFound"


import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
     <Routes >
      <Route path = "/" element = {<Home />} />
      <Route path = "/signup" element = {<Signup /> }/>
      <Route path = "/login" element = {<Login /> }/>
      <Route path = "/workouts" element = {<Workouts /> }/>
      <Route path = "/routines" element = {<Routines /> }/>
      <Route path = "/trainer" element = {<Trainer /> }/>
      <Route path = "/user/:userid" element = {<User /> }/>
      <Route path = "/user/:userid/training" element = {<Training />} />

      <Route path = "/error" element = {<Error /> }/>
      <Route path = "*" element = {<NotFound /> }/>
     </Routes>
    </>
  )
}

export default App
