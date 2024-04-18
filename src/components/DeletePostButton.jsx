import { BsTrash3Fill } from 'react-icons/bs'
import { deletePost } from '../services/postsFetch'
import Modal from './Modal'
import { useState } from 'react'
import Spinner from './Spinner'

const DeletePostButton = ({ postId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deletePost(postId)
      setLoading(false)
      closeModal()
    } catch (error) {
      console.log(error)
      setLoading(false)
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
        <div className='border border-gray-500 flex flex-col gap-5 font-bold py-4 rounded bg-gray-200 items-center justify-center'>

          <p className='text-gray-700'>Estas seguro de eliminar el Post?</p>
          {!loading
            ? <div className='flex gap-5'>
              <button
                className='bg-red-500 p-1 rounded'
                onClick={closeModal}
              >Cancelar
              </button>
              <button
                className='bg-green-500 p-1 rounded'
                onClick={handleDelete}
              >Aceptar
              </button>
            </div>
            : <div className='flex items-center justify-center'>
              <Spinner size='50' />
            </div>}

        </div>
      </Modal>
    </>

  )
}

export default DeletePostButton
