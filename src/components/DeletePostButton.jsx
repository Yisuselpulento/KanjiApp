import { BsTrash3Fill } from 'react-icons/bs'
import { deletePost } from '../services/postsFetch'
import Modal from './Modal'
import { useState } from 'react'
import Spinner from './Spinner'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'

const DeletePostButton = ({ postId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { posts, setPosts } = useAuth()

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deletePost(postId)
      const updatedProducts = posts?.filter(post => post._id !== postId)
      setPosts(updatedProducts)
      toast.success('Eliminado Correctamente')
      closeModal()
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={openModal}>
        <BsTrash3Fill className='md:w-7 md:h-7 w-7 h-5 p-1 hover:dark:bg-hoverDark hover:bg-hoverLight rounded-full' />
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className='border border-gray-500 flex flex-col gap-2 font-bold py-4 rounded bg-gray-200 items-center justify-center'>

          <p className='text-gray-700'>Estas seguro de eliminar el Post?</p>
          loading
          ? <div className='flex gap-5'>
            <button
              disabled={loading}
              className='bg-red-500 p-1 rounded'
              onClick={closeModal}
            >Cancelar
            </button>
            <button
              disabled={loading}
              className='bg-green-500 p-1 rounded'
              onClick={handleDelete}
            >{loading
              ? <div>
                <Spinner size='25' />
              </div>
              : 'Aceptar'}
            </button>
            </div>

        </div>
      </Modal>
    </>

  )
}

export default DeletePostButton
