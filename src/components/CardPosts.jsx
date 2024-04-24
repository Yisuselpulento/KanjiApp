import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'
import Lightbox from './Lightbox'
import HeartAndReplies from './HeartAndReplies'
import { calculateTimeSincePost } from '../helpers/TimePostFunction'
import useAuth from '../hooks/useAuth'
import DeletePostButton from './DeletePostButton'
import FormReplies from './FormReplies'

const CardPosts = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { auth } = useAuth()

  const { text, likes, _id, author, createdAt, img, numberOfReplies, numberOfLikes } = post

  const isUser = auth._id === author._id

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className='flex md:gap-5 gap-3 md:p-5 mb-6 '>
      <Link
        className='h-full'
        to={isUser ? '/profile' : `/user/${author?._id}`}
      >
        <img
          className='md:w-16 md:h-16 w-10 h-10 rounded-full mr-4 object-cover'
          src={author?.profilePic} alt='imagen de usuario'
        />
      </Link>
      <div className='w-full flex flex-col gap-2 '>
        <div className='flex justify-between '>
          <Link
            to={isUser ? '/profile' : `/user/${author?._id}`}
            className='font-bold text-sm md:text-lg'
          >{author?.username}
          </Link>
          <div className='flex md:gap-3 gap-1 justify-center items-center'>
            <p className='text-sm text-neutral-600'>Hace {calculateTimeSincePost(createdAt)}</p>
            {auth._id === author._id &&
              <DeletePostButton
                postId={_id}
              />}

          </div>
        </div>
        <div className='flex flex-col md:gap-5 gap-3 border-l md:max-w-[600px] w-full'>
          <Link
            to={`/post/${_id}`}
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
        <HeartAndReplies
          postiD={_id}
          openModal={openModal}
          likes={likes}
          numberOfReplies={numberOfReplies}
          numberOfLikes={numberOfLikes}

        />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <FormReplies
          postId={_id}
        />
      </Modal>
    </div>
  )
}

export default CardPosts
