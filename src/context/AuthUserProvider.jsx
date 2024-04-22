import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const AuthUserContext = createContext({})

const AuthUserProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [cargando, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = window.localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios('/users/perfil', config)
        console.log(data)
        setAuth(data)
        navigate('/')
      } catch (error) {
        setAuth({})
      }

      setLoading(false)
    }
    autenticarUsuario()
  }, [])

  const cerrarSesionAuth = () => {
    setAuth({})
  }

  return (
    <AuthUserContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth,
        posts,
        setPosts,
        setComments,
        comments

      }}
    >
      {children}
    </AuthUserContext.Provider>
  )
}

export {
  AuthUserProvider
}

export default AuthUserContext
