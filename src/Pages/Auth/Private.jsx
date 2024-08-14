import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { Navigate } from 'react-router-dom'
// Este componente va a envolver otras paginas para hacerlas privadas.
function Private(props) {
  const { isLoggedIn } = useContext(AuthContext)
  if (isLoggedIn) {
    // el usuario está logeado, puede acceder a la página
    return props.children
  } else {
    // el usuario no está logeado, redireccionamos a una pagina publica o /login
    return <Navigate to="/" />
  }
}
export default Private