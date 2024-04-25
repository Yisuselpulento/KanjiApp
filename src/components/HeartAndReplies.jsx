import { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa'
import { LikeUnlikePost } from '../services/postsFetch'
import useAuth from '../hooks/useAuth'
import { getUser } from '../services/usersFetch'
import { Link } from 'react-router-dom'

const HeartAndReplies = ({ openModal, postiD, likes, numberOfReplies, numberOfLikes }) => {
  const [numberOfLikesState, setNumberOfLikesState] = useState(numberOfLikes)
  const [usersLikes, setUsersLikes] = useState([])
  const [hovered, setHovered] = useState(false)

  const [liked, setliked] = useState(false)
  const { auth } = useAuth()

  useEffect(() => {
    const userLikedPost = likes?.some((like) => like === auth._id)
    setliked(userLikedPost)
  }, [])

  useEffect(() => {
    const fetchUsersLikes = async () => {
      const users = await Promise.all(likes.map(async (like) => {
        const userData = await getUser(like)
        return userData
      }))
      setUsersLikes(users)
    }

    fetchUsersLikes()
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
        <button onClick={handleToggleHeart}>
          {liked
            ? (
              <FaHeart className='md:w-6 md:h-6 w-5 h-5 text-red-500 ' />
              )
            : (
              <FaRegHeart className='md:w-6 md:h-6 w-5 h-5 dark:hover:text-gray-700 hover:text-blue-700' />
              )}
        </button>
        <button>
          <FaRegComment
            onClick={openModal}
            className='md:w-6 md:h-6 w-5 h-5 dark:hover:text-gray-700 hover:text-blue-700'
          />
        </button>
      </div>
      <div className='flex gap-5 text-neutral-600'>

        <p>
          {numberOfReplies} {numberOfReplies === 1 ? 'comentario' : 'comentarios'}
        </p>

        <p>.</p>
        <div
          className='relative'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <p>
            <span>{numberOfLikesState}</span>{' '}
            {numberOfLikesState === 1 ? 'Like' : 'Likes'}
          </p>
          {hovered && (
            <div className='absolute z-10 top-full left-0 rounded shadow-md '>
              {usersLikes.map(user => (

                <Link
                  key={user._id}
                  to={user._id === auth._id ? '/profile' : `/user/${user._id}`}
                  className='flex gap-5  rounded-lg items-center bg-gray-100 border-b w-52 dark:bg-stone-800 p-3 dark:text-gray-200 text-gray-700 hover:bg-gray-300 dark:hover:bg-stone-900'
                >
                  <div>
                    <img
                      src={user.profilePic}
                      alt={user.username}
                      className='w-6 h-6 rounded-full '
                    />
                  </div>
                  <p>
                    {user.username}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default HeartAndReplies
