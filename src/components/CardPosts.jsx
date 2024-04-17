import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import Lightbox from './Lightbox'
import { getUser } from '../services/usersFetch'
import HeartAndReplies from './HeartAndReplies'
import { calculateTimeSincePost } from '../helpers/TimePostFunction'
import useAuth from '../hooks/useAuth'
import DeletePostButton from './DeletePostButton'

const CardPosts = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({})
  const { auth } = useAuth()

  useEffect(() => {
    const getUserPerId = async () => {
      try {
        const data = await getUser(postedBy)
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserPerId()
  }, [post])

  const { profilePic, username, _id: userID } = user

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const { text, likes, _id: postiD, replies, postedBy, createdAt } = post
  const isUser = auth._id === postedBy

  return (
    <div className='flex md:gap-5 gap-3 md:p-5 mb-6 '>
      <Link
        className='h-full'
        to={isUser ? '/profile' : `/user/${userID}`}
      >
        <img
          className='md:w-16 md:h-16 w-10 h-10 rounded-full mr-4 object-cover'
          src={profilePic} alt='imagen de usuario'
        />
      </Link>
      <div className='w-full flex flex-col gap-2 '>
        <div className='flex justify-between '>
          <Link
            to={isUser ? '/profile' : `/user/${userID}`}
            className='font-bold text-sm md:text-lg'
          >{username}
          </Link>
          <div className='flex md:gap-3 gap-1 justify-center items-center'>
            <p className='text-sm text-neutral-600'>Hace {calculateTimeSincePost(createdAt)}</p>
            {auth._id === postedBy &&
              <DeletePostButton
                postId={postiD}
              />}

          </div>
        </div>
        <div className='flex flex-col md:gap-5 gap-3 border-l md:max-w-[600px] w-full'>
          <Link
            to={`/post/${postiD}`}
            className='dark:bg-bgDark bg-gray-200 md:p-4 p-2 '
          >
            <p>{text}</p>
          </Link>
          {/*   {img && (
            <Lightbox
              style='cursor-pointer object-contain rounded md:max-w-[450px]  ml-3'
              photo={img} alt='post imagen de usuario'
            />
          )} */}

        </div>
        <HeartAndReplies
          postiD={postiD}
          openModal={openModal}
          likes={likes}
        />

        <div className='flex gap-5 text-neutral-600'>
          <p>{replies.length} {replies.length === 1 ? 'comentario' : 'comentarios'}</p>
          <p>.</p>
          <p>{likes.length} Likes</p>
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
