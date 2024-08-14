import { useState, useContext } from 'react'
import { AuthContext } from './context/auth.context'
import { Navigate } from 'react-router-dom'
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
import Admin from './Pages/Auth/Admin'
import Private from './Pages/Auth/Private'


function App() {
  const { authenticateUser , isLoggedIn } = useContext(AuthContext);

  return (
    <>
     <Routes >
      <Route path = "/" element = {<Home />} />
      <Route path = "/signup" element = {<Signup /> }/>
      <Route path = "/login" element = { !isLoggedIn ? <Login /> : <Navigate to="/user" />}/>
      <Route path = "/workouts" element = {<Admin><Workouts /></Admin> }/>
      <Route path = "/routines" element = {<Private><Routines /></Private> }/>
      <Route path = "/trainer" element = {<Admin><Trainer /></Admin> }/>
      <Route path = "/user" element = {<Private><User /></Private> }/>
      <Route path = "/user/training" element = {<Private><Training /></Private>} />
      <Route path = "/error" element = {<Error /> }/>
      <Route path = "*" element = {<NotFound /> }/>
     </Routes>
    </>
  )
}

export default App
