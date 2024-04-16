import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import { Link, useParams } from 'react-router-dom'
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa'
import Modal from '../components/Modal'
import Comments from '../components/Comments'
import postsUsers from '../data/posts.json'
import users from '../data/users.json'

const PostsPage = () => {
  const [liked, setliked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { postId: idpost } = useParams()

  const post = postsUsers.posts.find(post => post.postId === parseInt(idpost))
  const user = users.usuarios.find(user => user.id === post.postedBy)

  console.log(user)
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleToggleHeart = () => {
    setliked(!liked)
  }

  const { text, img, likes, comments } = post || {}

  return (
    <div className='flex flex-col gap-3 md:w-[800px] justify-center '>
      <div className='flex justify-between items-center'>
        <Link
          to={`/user/${user.id}`}
          className='flex items-center gap-2 font-bold'
        >
          <img
            className='md:w-16 md:h-16 w-10 h-10 rounded-full mr-4'
            src={user.profilePic} alt='imagen de usuario'
          />
          <p className='text-lg'>{user.username}</p>
        </Link>
        <p className='dark:text-neutral-600 text-gray-500'>hace 14 horas</p>
      </div>
      <div className='flex flex-col gap-4 justify-center  dark:bg-bgDark rounded border-x p-4'>
        <p>{text} </p>
        {img && <Lightbox
          style='rounded'
          photo={img} alt='post imagen de usuario'
                />}

      </div>
      <div className='flex  flex-col gap-4'>
        <div className='flex  gap-5'>
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
        <div className='flex gap-4 text-neutral-600'>
          <p>2 comments</p>
          <p>.</p>
          <p>{likes} Likes</p>
        </div>

      </div>
      <div className='flex justify-between gap-4'>
        <input
          placeholder='Comenta aqui...'
          className='w-full md:p-4 p-3 dark:bg-bgDark border bg-gray-200 dark:border-neutral-800 rounded text-lg'
        />
        <button
          className='font-bold dark:bg-neutral-800 bg-gray-200 hover:bg-gray-300 dark:hover:bg-neutral-900  px-3 md:px-5 rounded'
        >Post
        </button>
      </div>

      <div>
        {comments
          ? comments.map(comment =>
            <Comments
              key={comment.commentId}
              comment={comment}
            />
          )
          : <p>Aun no tienes comentarios</p>}
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

export default PostsPage
