import { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa'
import { LikeUnlikePost } from '../services/postsFetch'
import useAuth from '../hooks/useAuth'

const HeartAndReplies = ({ openModal, postiD, likes, numberOfReplies, numberOfLikes }) => {
  const [numberOfLikesState, setNumberOfLikesState] = useState(numberOfLikes)

  const [liked, setliked] = useState(false)

  const { auth } = useAuth()

  useEffect(() => {
    const userLikedPost = likes?.some((like) => like === auth._id)
    setliked(userLikedPost)
  }, [])

  const handleToggleHeart = async () => {
    try {
      await LikeUnlikePost(postiD)
      setliked(!liked)
      setNumberOfLikesState(prevLikes => liked ? prevLikes - 1 : prevLikes + 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-5 mt-3 md:mt-5'>
      <div className='flex gap-4'>
        <button
          onClick={handleToggleHeart}
        >{liked ? <FaHeart className='md:w-6 md:h-6 w-5 h-5 text-red-500 ' /> : <FaRegHeart className='md:w-6 md:h-6 w-5 h-5 dark:hover:text-gray-700 hover:text-blue-700' />}
        </button>
        <button><FaRegComment
          onClick={openModal}
          className='md:w-6 md:h-6 w-5 h-5 dark:hover:text-gray-700 hover:text-blue-700'
                />
        </button>

      </div>

      <div className='flex gap-5 text-neutral-600'>
        <p>{numberOfReplies} {numberOfReplies === 1 ? 'comentario' : 'comentarios'}</p>
        <p>.</p>
        <p>{numberOfLikesState} {numberOfLikesState === 1 ? 'Like' : 'Likes'}</p>
      </div>
    </div>
  )
}

export default HeartAndReplies
