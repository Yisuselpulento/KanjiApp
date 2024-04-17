import { useContext } from 'react'
import AuthUserContext from '../context/AuthUserProvider'

const useAuth = () => {
  return useContext(AuthUserContext)
}

export default useAuth
