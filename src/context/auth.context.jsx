import { createContext, useEffect, useState } from "react";
import service from "../service/service.config";


const AuthContext = createContext()


function AuthWrapper(props) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loggedUserId, setLoggedUserId ] = useState(null)
  const [ isAuthenticating, setIsAuthenticating ] = useState(true)


  const [ isAdmin, setIsAdmin ] = useState(false)

  const authenticateUser = async () => {

    console.log("validando el token")

    const authToken = localStorage.getItem("authToken")

   
    if (!authToken) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAuthenticating(false)

      setIsAdmin(false)
      return;
    }

    try {
      



      const response = await service.get("/auth/verify")

      console.log(response)

      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setIsAuthenticating(false)

      if (response.data.role === "admin") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }

    } catch (error) {
      console.log(error)

      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAuthenticating(false)

      setIsAdmin(false)

    }

  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    isAdmin
  }


  useEffect(() => {
    authenticateUser()
  }, [])

  if (isAuthenticating) {
    return <h3>... validando credenciales</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper
}