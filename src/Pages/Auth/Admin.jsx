import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { Navigate } from 'react-router-dom'
// Este componente va a envolver otras paginas para hacerlas solo accesibles para admin.
function Admin(props) {
  const { isAdmin } = useContext(AuthContext)
  if (isAdmin) {
    // el usuario está logeado, puede acceder a la página
    return props.children
  } else {
    // el usuario no está logeado, redireccionamos a una pagina publica o /login
    return <Navigate to="/" />
  }
}
export default Admin