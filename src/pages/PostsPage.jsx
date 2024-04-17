import { useState, useEffect } from 'react'
import Lightbox from '../components/Lightbox'
import { Link, useParams } from 'react-router-dom'
import Modal from '../components/Modal'
import Comments from '../components/Comments'
import { fetchPostPage } from '../services/postsFetch'
import { getUser } from '../services/usersFetch'
import HeartAndReplies from '../components/HeartAndReplies'
import { calculateTimeSincePost } from '../helpers/TimePostFunction'
import useAuth from '../hooks/useAuth'
import DeletePostButton from '../components/DeletePostButton'
import Spinner from '../components/Spinner'

const PostsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const { auth } = useAuth()

  const [post, setPost] = useState({})
  const [user, setUser] = useState({})

  const { postId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPostPage(postId)
        setPost(postData)
        const userData = await getUser(postData.postedBy)
        setUser(userData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [postId])

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const { text, likes, replies, createdAt, postedBy } = post
  const { profilePic, username, _id: userID } = user

  const isUser = auth._id === postedBy

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-3 md:w-[800px] justify-center '>
      <div className='flex justify-between items-center'>
        <Link
          to={isUser ? '/profile' : `/user/${userID}`}
          className='flex items-center gap-2 font-bold'
        >
          <img
            className='md:w-16 md:h-16 w-10 h-10 rounded-full mr-4 object-cover'
            src={profilePic} alt='imagen de usuario'
          />
          <p className='text-lg'>{username}</p>
        </Link>
        <div className='flex gap-3'>

          <p className='dark:text-neutral-600 text-gray-500'>Hace {calculateTimeSincePost(createdAt)}</p>
          {auth._id === postedBy &&
            <DeletePostButton
              postId={postId}
            />}
        </div>
      </div>
      <div className='flex flex-col gap-4 justify-center  dark:bg-bgDark rounded border-x p-4'>

        <p>{text} </p>
        {/*  {img && <Lightbox
          style='rounded'
          photo={img} alt='post imagen de usuario'
                />}
 */}
      </div>
      <div className='flex  flex-col gap-4'>
        <HeartAndReplies
          postiD={postId}
          openModal={openModal}
          likes={likes}
        />
        <div className='flex gap-4 text-neutral-600'>
          <p>{replies?.length} {replies?.length === 1 ? 'comentario' : 'comentarios'}</p>
          <p>.</p>
          <p>{likes?.length} Likes</p>
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
        {replies
          ? replies.map(replie =>
            <Comments
              key={replie._id}
              replie={replie}
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
