import { useState } from 'react'
import { createPost } from '../services/postsFetch'
import useAuth from '../hooks/useAuth'
import Toast from './Toast'
import Spinner from './Spinner'

const FormPost = ({ closeModal }) => {
  const { auth } = useAuth()
  const [postText, setPostText] = useState('')
  const [loading, setLoading] = useState('')
  const userId = auth._id

  const handleSubmit = async (event) => {
    event.preventDefault()
    const postData = {
      text: postText,
      postedBy: userId
    }

    try {
      setLoading(true)
      await createPost(postData)
      closeModal()
      setPostText('')
    } catch (error) {
      setLoading(false)
      console.error('Error al crear el post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTextChange = (event) => {
    setPostText(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className='bg-postColor md:px-8 px-4 pt-14 md:pb-8 pb-4 rounded flex flex-col md:gap-6 gap-6 text-gray-200'>
      {!loading && <Toast />}
      <p className='text-2xl font-bold'>Crea un post</p>
      <input
        type='text'
        value={postText}
        onChange={handleTextChange}
        className='rounded border p-3 text-lg border-[#64748b] bg-postColor w-full h-24'
        placeholder='Escribe tu post aquí...'
      />
      {/* <input type='file' /> */}
      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-blue-300 border border-blue-400 hover:bg-blue-400 text-gray-700 font-bold md:px-4 px-2 md:py-2 py-1 rounded md:w-[100px] w-[70px] cursor-pointer text-sm md:text-lg flex items-center justify-center'
        >
          {loading
            ? <div className='w-5 h-6'><Spinner /></div>
            : 'Post'}
        </button>
      </div>
    </form>
  )
}

export default FormPost
