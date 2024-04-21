import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { updateUser } from '../services/usersFetch'
import Spinner from './Spinner'
import Countries from '../helpers/Countries.json'
import { toast } from 'react-toastify'

const FormEdit = ({ closeModal }) => {
  const { auth } = useAuth()
  const { profilePic } = auth

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    age: '',
    sexo: '',
    country: '',
    bio: ''
  })

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let imageUrl = ''

      if (image) {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'image_preset')

        const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData)

        imageUrl = res.data.secure_url
        console.log(res.data.secure_url)
      }

      setLoading(true)
      const userData = { ...formData, profilePic: imageUrl }
      console.log(userData)
      await updateUser(userData, auth._id)
      setFormData({
        age: '',
        sexo: '',
        country: '',
        bio: ''
      })
      toast.success('Datos actualizados correctamente')
      setImage(null)
    } catch (error) {
      toast.error('Ha ocurrido un error')
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-full p-1 '>
      <div className='dark:bg-stone-900 bg-gray-200 w-full rounded-lg p-6 md:p-14 md:w-[500px] flex flex-col gap-4 dark:text-indigo-100 min-h-screen md:min-h-[700px]'>
        <div>
          <p className='md:text-3xl text-xl font-bold'>Edita tu info</p>
        </div>
        <div className='flex gap-5 items-center justify-between '>
          <img
            className='rounded-full md:w-28 md:h-28 w-20 h-20 object-cover'
            src={profilePic}
            alt='Profile'
          />
          <input
            type='file'
            id='image-upload'
            onChange={handleImageChange}
            className='rounded-md bg-stone-800 font-bold w-[250px] p-2'
          />

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
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <select
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark '
              name='sexo'
              value={formData.sexo}
              onChange={handleChange}
            >
              <option value='Mujer'>Mujer</option>
              <option value='Hombre'>Hombre</option>
            </select>
          </div>
          <div>
            <label className='block pb-2'>Pais</label>
            <select
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              value={formData.country}
              onChange={handleChange}
              name='country'
              placeholder='Chile'
            >
              <option
                disabled selected
              >Selecciona un país
              </option>
              {Countries.map((country, index) => (
                <option
                  key={index} value={country.name}
                >{country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='block pb-2'>Bio</label>
            <textarea
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
              disabled={loading}
              onClick={() => closeModal()}
              className='bg-red-400 hover:bg-red-500 rounded uppercase md:p-3 p-1 w-full font-bold md:text-lg text-white'
            >
              cancelar
            </button>
            <button
              disabled={loading}
              className='bg-green-500 hover:bg-green-600 rounded uppercase md:p-3 p-1 w-full font-bold md:text-lg text-white'
              type='submit'
            >
              {loading
                ? <div className='flex items-center justify-center '>
                  <Spinner size='30' />
                </div>
                : 'Aceptar'}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default FormEdit
