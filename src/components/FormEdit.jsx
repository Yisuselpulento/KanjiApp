import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'

const FormEdit = ({ closeModal }) => {
  const { auth } = useAuth()
  const { profilePic } = auth

  const [formData, setFormData] = useState({
    age: '',
    sexo: '',
    country: '',
    bio: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes hacer lo que necesites con el objeto formData, como enviarlo a través de una petición HTTP
    console.log(formData)
    setFormData({
      edad: '',
      sexo: '',
      country: '',
      bio: ''
    })
  }

  return (
    <div className='flex justify-center items-center h-full p-1'>
      <div className='dark:bg-stone-900 bg-gray-200 w-full rounded-lg p-6 md:p-14 md:w-[500px] flex flex-col gap-4 dark:text-indigo-100 '>
        <div>
          <p className='md:text-3xl text-xl font-bold'>Edita tu info</p>
        </div>
        <div className='flex gap-5 items-center justify-between '>
          <img
            className='rounded-full md:w-28 md:h-28 w-20 h-20 object-cover'
            src={profilePic}
            alt='Profile'
          />
          <button
            className='dark:bg-neutral-700 bg-gray-300 hover:bg-gray-400 dark:hover:bg-neutral-800 md:w-60 w-32 h-10 rounded'
          >
            Cambiar foto
          </button>
        </div>
        <form
          className='  flex flex-col md:gap-8 gap-5 shadow-lg'
          onSubmit={handleSubmit}
        >
          <div>
            <label className='block pb-2'>Edad</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='text'
              name='age'
              placeholder='18'
              value={formData.edad}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='block pb-2'>Sexo</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='text'
              name='sexo'
              placeholder='Masculino'
              value={formData.sexo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='block pb-2'>Pais</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='text'
              name='country'
              placeholder='Chile'
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='block pb-2'>Bio</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='text'
              name='bio'
              placeholder='Colocar aqui...'
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-4'>
            <button
              onClick={() => closeModal()}
              className='bg-red-400 hover:bg-red-500 rounded uppercase md:p-3 p-1 w-full font-bold md:text-lg text-white'
            >
              cancelar
            </button>
            <button
              className='bg-green-500 hover:bg-green-600 rounded uppercase md:p-3 p-1 w-full font-bold md:text-lg text-white'
              type='submit'
            >
              aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormEdit
