import { useState } from 'react'
import { createPost, FetchGetUserPosts } from '../services/postsFetch'
import useAuth from '../hooks/useAuth'
import Spinner from './Spinner'
import Alert from './Alert'
import axios from 'axios'
import { toast } from 'react-toastify'

const FormPost = ({ closeModal }) => {
  const { auth, setPosts } = useAuth()
  const [postText, setPostText] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({})
  const [image, setImage] = useState(null)

  const userId = auth._id

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!postText.trim()) {
      setAlert({
        msg: 'No hay nada escrito',
        error: true
      })
      return
    }
    try {
      let imageUrl = ''

      if (image) {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'image_preset')
        setLoading(true)
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData)

        imageUrl = res.data.secure_url
      }

      setLoading(true)
      await createPost({
        text: postText,
        postedBy: userId,
        img: imageUrl
      })
      const newPost = await FetchGetUserPosts(auth._id)
      setPosts(newPost)
      closeModal()
      toast.success('Post Creado Correctamente')
      setPostText('')
      setImage(null)
    } catch (error) {
      setLoading(false)
      toast.error('Ha ocurrido un error')
      console.error('Error al crear el post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTextChange = (e) => {
    setPostText(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className='bg-postColor md:px-8 px-4 pt-14 md:pb-8 pb-4 rounded flex flex-col md:gap-6 gap-6 text-gray-200'>
      <p className='text-2xl font-bold'>Crea un post</p>
      <input
        type='text'
        value={postText}
        onChange={handleTextChange}
        className='rounded border p-3 text-lg border-[#64748b] bg-postColor w-full h-24'
        placeholder='Escribe tu post aquí...'
      />
      <input
        type='file'
        id='image-upload'
        onChange={handleImageChange}
        className='rounded-md bg-slate-800 font-bold w-[250px] p-2'
      />
      <div className='flex justify-end gap-5 items-center'>
        {alert.msg && <Alert alert={alert} />}

        <button
          disabled={loading}
          type='submit'
          className='bg-blue-300 border border-blue-400 hover:bg-blue-400 text-gray-700 font-bold md:px-4 px-2 md:py-2 py-1 rounded md:w-[100px] w-[70px] cursor-pointer text-sm md:text-lg flex items-center justify-center'
        >{loading
          ? <div><Spinner size='23' /></div>
          : 'Post'}
        </button>

      </div>
    </form>
  )
}

export default FormPost
