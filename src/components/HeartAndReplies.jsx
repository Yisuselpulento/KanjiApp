import { useState, useEffect } from 'react'
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'
import { LikeUnlikePost } from '../services/postsFetch'

const HeartAndReplies = ({ openModal, postiD, likes }) => {
  const [liked, setliked] = useState(false)
  const { auth } = useAuth()

  useEffect(() => {
    const userLikedPost = likes?.some((like) => like === auth._id)
    setliked(userLikedPost)
  }, [likes, auth._id])

  const handleToggleHeart = async () => {
    try {
      await LikeUnlikePost(postiD)
      setliked(!liked)
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
  )
}

export default HeartAndReplies
