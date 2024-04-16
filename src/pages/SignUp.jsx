import { useState } from 'react'
import Alert from '../components/Alert'
const SignUp = () => {
  const [formData, setFormData] = useState({
    usuario: '',
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}

    // Validación de campos vacíos
    for (const key in formData) {
      if (formData[key] === '') {
        setAlert({
          msg: 'Todos los campos son obligatorios ',
          error: true
        })

        return
      }
    }

    // Validación de usuario único y longitud máxima de 10 caracteres
    if (formData.usuario.length > 10 || formData.usuario.length < 4) {
      setAlert({
        msg: 'Usuario no puede tener más de 10 caracteres o menos de 4',
        error: true
      })
      return
    }

    // Validación de contraseñas coincidentes y longitud máxima de 20 caracteres
    if (formData.password !== formData.repeatPassword) {
      setAlert({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      return
    }
    if (formData.password.length > 20 || formData.password.length < 4) {
      setAlert({
        msg: 'La contraseña no puede tener más de 20 caracteres o menos de 4',
        error: true
      })
      return
    }

    // Validación de email único y formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setAlert({
        msg: 'Email no es válido',
        error: true
      })
      return
    }

    // Establecer errores si los hay
    if (Object.keys(errors).length === 0) {
      setAlert({
        msg: 'Registro exitoso',
        error: false
      })
    }
  }
  return (
    <div className='flex justify-center  items-center h-full my-10'>
      <div className='dark:bg-stone-900 bg-gray-200 w-full rounded p-10 md:p-14 md:w-[500px] flex flex-col gap-4 dark:text-indigo-100 '>
        <div>
          <p>Bienvenido a KanjiApp</p>
          <p className='text-3xl font-bold'>Create una cuenta</p>
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
              name='usuario'
              placeholder='Usuario'
              value={formData.usuario}
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
          <button
            className='bg-slate-700 hover:bg-slate-800 uppercase p-4 w-full font-bold text-lg text-white'
            type='submit'
          >Registrar
          </button>
          {alert.msg && <Alert alert={alert} />}

        </form>

      </div>

    </div>
  )
}

export default SignUp
