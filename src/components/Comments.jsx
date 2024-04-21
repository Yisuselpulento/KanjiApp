import { BsTrash3Fill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { deleteReplie } from '../services/postsFetch'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Spinner from './Spinner'

const Comments = ({ replie, postid }) => {
  const { auth } = useAuth()
  const { text, userId, _id } = replie
  const [loading, setLoading] = useState(false)

  const isUser = auth._id === userId._id

  const handledeleteReplie = async () => {
    try {
      setLoading(true)
      await deleteReplie(postid, _id)
      toast.success('Eliminado Correctamente')
    } catch (error) {
      setLoading(false)
      toast.success('Error al borrar el comentario')
      console.error('Error al borrar el post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex gap-3 py-6 border-t border-neutral-800'>
      <Link to={isUser ? '/profile' : `/user/${userId?._id}`}>
        <img
          className='md:w-16 md:h-16 w-10 h-10 rounded-full mr-4 object-cover'
          src={userId.profilePic}
        />
      </Link>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex justify-between '>
          <Link to={isUser ? '/profile' : `/user/${userId?._id}`} className='text-md font-bold'>
            {userId.username}
          </Link>
          {isUser && (
            loading
              ? <div><Spinner size='24' /></div>
              : <button
                  disabled={loading}
                  onClick={handledeleteReplie}
                  className='p-1 dark:hover:bg-stone-800 rounded-full'
                >
                <BsTrash3Fill />
                </button>
          )}
        </div>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Comments
