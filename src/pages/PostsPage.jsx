import { useState, useEffect } from 'react'
import Lightbox from '../components/Lightbox'
import { Link, useParams } from 'react-router-dom'
import Modal from '../components/Modal'
import Comments from '../components/Comments'
import { fetchPostPage, createReplies } from '../services/postsFetch'
import HeartAndReplies from '../components/HeartAndReplies'
import { calculateTimeSincePost } from '../helpers/TimePostFunction'
import useAuth from '../hooks/useAuth'
import DeletePostButton from '../components/DeletePostButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import FormReplies from '../components/FormReplies'

const PostsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [postText, setPostText] = useState('')
  const [alert, setAlert] = useState({})
  const { auth } = useAuth()
  const [post, setPost] = useState({})

  const [repliesState, setRepliesState] = useState([])

  const { postId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPostPage(postId)
        setRepliesState(postData.replies)
        setPost(postData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const { text, likes, createdAt, author, img, numberOfLikes, numberOfReplies } = post

  const isUser = auth._id === author?._id

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    )
  }

  const handlePostReplie = async (e) => {
    e.preventDefault()

    if (!postText.trim()) {
      setAlert({
        msg: 'No hay nada escrito',
        error: true
      })
    }

    try {
      const replieInfo = {
        text: postText
      }
      const newReplie = await createReplies(postId, replieInfo)
      setRepliesState(prevReplies => [...prevReplies, newReplie.newReply])
      toast.success(newReplie.message)
      setPostText('')
    } catch (error) {
      setLoading(false)
      toast.error('Ha ocurrido un error')
      console.error('Error al crear el post:', error)
    }
  }

  const handleTextChange = (e) => {
    setPostText(e.target.value)
  }

  const updateReplies = (deletedReplyId) => {
    setRepliesState(prevReplies => prevReplies.filter(reply => reply._id !== deletedReplyId))
  }

  return (

    <div className='flex flex-col gap-3 md:w-[800px] justify-center '>
      <div className='flex justify-between items-center'>
        <Link
          to={isUser ? '/profile' : `/user/${author?._id}`}
          className='flex items-center gap-2 font-bold'
        >
          <img
            className='md:w-16 md:h-16 w-10 h-10 rounded-full mr-4 object-cover'
            src={author?.profilePic} alt='imagen de usuario'
          />
          <p className='text-lg'>{author?.username}</p>
        </Link>
        <div className='flex gap-3'>

          <p className='dark:text-neutral-600 text-gray-500'>Hace {calculateTimeSincePost(createdAt)}</p>
          {auth._id === author?._id &&
            <DeletePostButton
              postId={author}
            />}
        </div>
      </div>
      <div className='flex flex-col gap-4 justify-center  dark:bg-bgDark rounded border-x p-4'>

        <p>{text} </p>
        {img && <Lightbox
          style='rounded'
          photo={img} alt='post imagen de usuario'
                />}

      </div>
      <div className='flex  flex-col gap-4'>
        <HeartAndReplies
          postiD={postId}
          openModal={openModal}
          likes={likes}
          numberOfReplies={numberOfReplies}
          numberOfLikes={numberOfLikes}
        />

      </div>
      <form
        onSubmit={handlePostReplie}
        className='flex justify-between gap-4'
      >
        <input
          type='text'
          value={postText}
          onChange={handleTextChange}
          placeholder='Comenta aqui...'
          className='w-full md:p-4 p-3 dark:bg-bgDark border bg-gray-200 dark:border-neutral-800 rounded text-lg'
        />
        <button
          type='submit'
          className='font-bold dark:bg-neutral-800 bg-gray-200 hover:bg-gray-300 dark:hover:bg-neutral-900  px-3 md:px-5 rounded'
        >Post
        </button>
      </form>

      <div>
        {repliesState
          ? (
              repliesState?.map((replie) => (
                <Comments
                  updateReplies={updateReplies}
                  key={replie._id} replie={replie} postid={postId}
                />
              ))
            )
          : (
            <p>Aun no tienes comentarios</p>
            )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <FormReplies
          postId={postId}
        />
      </Modal>
    </div>
  )
}

export default PostsPage
