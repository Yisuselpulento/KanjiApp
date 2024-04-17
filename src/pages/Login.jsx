import { useState } from 'react'
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [alert, setAlert] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    for (const key in formData) {
      if (formData[key] === '') {
        setAlert({
          msg: 'Todos los campos son obligatorios ',
          error: true
        })

        return
      }
    }

    try {
      const { data } = await clienteAxios.post('/users/login', formData)

      setAlert({})
      window.localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/')
    } catch (error) {
      console.log(error)
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='dark:bg-stone-900 bg-gray-200 w-full rounded p-10 md:p-14 md:w-[500px] flex flex-col gap-4 dark:text-indigo-100 '>
        <div>
          <p className='text-3xl font-bold'>Inicia sesion</p>
        </div>
        <form
          className='  flex flex-col gap-8 shadow-lg  '
          onSubmit={handleSubmit}
        >
          <div className='dark:text-indigo-100 text-gray-500'>
            <label className='block   pb-2'>Usuario</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='text'
              name='username'
              placeholder='username'
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='block pb-2'>Password</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <input
            to='/'
            className='bg-slate-700 hover:bg-slate-800 uppercase p-4 w-full font-bold text-lg text-white text-center'
            type='submit'
            value='Entrar'
          />
          {alert.msg && <Alert alert={alert} />}

        </form>

      </div>

    </div>
  )
}

export default Login
