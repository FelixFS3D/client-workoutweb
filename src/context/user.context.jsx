import React, { createContext, useContext, useState, useEffect } from 'react'
import { AuthContext } from './auth.context'
import service from '../service/service.config'

const UserContext = createContext()

function UserWrapper(props) {
    const { isLoggedIn , authenticateUser } = useContext(AuthContext)

    const [ imgUser, setImgUser ] = useState(null)

    useEffect(() => {
        if (isLoggedIn) { 
            getUserData();
        }
    }, [isLoggedIn]); // Se ejecuta cuando `isLoggedIn` cambia

    const getUserData = async () => {
        try {
            const response = await service.get('/users/');
            setImgUser(response.data.imgUser);
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };
    const passedContext = {
        imgUser,
        setImgUser
    }

  return (
  <UserContext.Provider value={passedContext}>
    {props.children}
  </UserContext.Provider>
  )
}

export {
UserWrapper,
UserContext
} 
