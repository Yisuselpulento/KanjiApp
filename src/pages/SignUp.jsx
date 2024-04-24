import { useState } from 'react'
import Alert from '../components/Alert'
import clienteAxios from '../config/clienteAxios'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatPassword: '',
    email: ''
  })
  const [alert, setAlert] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { repeatPassword, ...formDataToSend } = formData
    for (const key in formDataToSend) {
      if (formDataToSend[key] === '') {
        setAlert({
          msg: 'Todos los campos son obligatorios ',
          error: true
        })

        return
      }
    }

    if (formDataToSend.username.length > 20 || formDataToSend.username.length < 4) {
      setAlert({
        msg: 'Usuario no puede tener más de 20 caracteres o menos de 4',
        error: true
      })
      return
    }

    if (formDataToSend.password !== formData.repeatPassword) {
      setAlert({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      return
    }
    if (formDataToSend.password.length > 20 || formDataToSend.password.length < 4) {
      setAlert({
        msg: 'La contraseña no puede tener más de 20 caracteres o menos de 4',
        error: true
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formDataToSend.email)) {
      setAlert({
        msg: 'Email no válido',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/users/signup', formDataToSend)

      setAlert({
        msg: data.msg,
        error: false
      })
      setFormData({
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
      })
    } catch (error) {
      console.log(error)
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <div className='flex justify-center items-center w-[350px] md:w-full h-full my-10'>
      <div className='dark:bg-stone-900 bg-gray-200 w-full  rounded p-8 md:p-14 md:w-[500px] flex flex-col gap-3 md:gap-4 dark:text-indigo-100 '>
        <div>
          <p>Bienvenido a KanjiApp</p>
          <p className='md:text-3xl text-xl font-bold'>Create una cuenta</p>
        </div>
        <form className='flex flex-col md:gap-8 gap-4 shadow-lg ' onSubmit={handleSubmit}>
          <div className='dark:text-indigo-100 text-gray-500'>
            <label className='block pb-2'>Usuario</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='text'
              name='username'
              placeholder='Username'
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
          <div>
            <label className='block pb-2'>Repetir Password</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='password'
              name='repeatPassword'
              value={formData.repeatPassword}
              placeholder='Password'
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='block pb-2'>Email</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
            />
          </div>
          <input
            className='bg-blue-700 hover:bg-blue-800 cursor-pointer uppercase p-3 md:p-4 w-full font-bold md:text-lg text-md text-white'
            type='submit'
            value='Registrar'
          />
          {alert.msg && <Alert alert={alert} />}
        </form>
      </div>
    </div>
  )
}

export default SignUp
