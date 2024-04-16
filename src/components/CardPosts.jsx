import { BsTrash3Fill } from 'react-icons/bs'
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import Lightbox from './Lightbox'

const CardPosts = ({ profilePic, user, post, userId }) => {
  const [liked, setliked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleToggleHeart = () => {
    setliked(!liked)
  }

  const { text, img, likes, postId, comments } = post || {}

  return (
    <div className='flex md:gap-5 gap-3 md:p-5 mb-6 '>

      <Link
        className='h-full'
        to={`/user/${userId}`}
      >
        <img
          className='md:w-16 md:h-16 w-10 h-10 rounded-full mr-4 object-cover'
          src={profilePic} alt='imagen de usuario'
        />
      </Link>
      <div className='w-full flex flex-col gap-2 '>
        <div className='flex justify-between '>
          <Link
            to={`/user/${userId}`}
            className='font-bold text-sm md:text-lg'
          >{user}
          </Link>
          <div className='flex md:gap-3 gap-1 justify-center items-center'>
            <p className='text-sm text-neutral-600'>about 14 hours ago</p>
            <button><BsTrash3Fill className='md:w-7 md:h-7 w-7 h-5 p-1 hover:dark:bg-hoverDark hover:bg-hoverLight rounded-full' /></button>
          </div>
        </div>
        <div className='flex flex-col md:gap-5 gap-3 border-l md:max-w-[600px] w-full'>
          <Link
            to={`/post/${postId}`}
            className='dark:bg-bgDark bg-gray-200 md:p-4 p-2 '
          >
            <p>{text}</p>
          </Link>
          {img && (
            <Lightbox
              style='cursor-pointer object-contain rounded md:max-w-[450px]  ml-3'
              photo={img} alt='post imagen de usuario'
            />
          )}

        </div>
        <div className='flex gap-5 md:mt-5 mt-3'>
          <button
            onClick={handleToggleHeart}
          >{liked ? <FaHeart className='md:w-6 md:h-6 w-5 h-5 text-red-500 ' /> : <FaRegHeart className='md:w-6 md:h-6 w-5 h-5 ' />}
          </button>
          <button><FaRegComment
            onClick={openModal}
            className='md:w-6 md:h-6 w-5 h-5'
                  />
          </button>
        </div>
        <div className='flex gap-5 text-neutral-600'>
          <p>{comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}</p>
          <p>.</p>
          <p>{likes} Likes</p>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <form className='bg-postColor md:px-8 px-4 pt-14 md:pb-8 pb-4 rounded flex flex-col md:gap-10 gap-6 '>
          <input
            className='p-3 rounded border border-[#64748b] bg-postColor w-full  '
          />
          <div className='flex justify-end'>
            <input
              value='Post'
              type='submit'
              className=' bg-blue-300 border border-blue-400 hover:bg-blue-400 text-gray-700 font-bold md:px-4 px-2 md:py-2 py-1 rounded md:w-[100px] w-[70px] cursor-pointer text-sm md:text-lg'
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CardPosts
