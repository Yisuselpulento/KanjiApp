import { followUnfollowFetch } from '../services/usersFetch'
import { useState } from 'react'
import Spinner from './Spinner'

const FollowButton = ({ id, initialUserFollow }) => {
  const [userFollow, setUserFollow] = useState(initialUserFollow)
  const [loading, setLoading] = useState(false)

  const handleFollowUnfollowUser = async () => {
    try {
      setLoading(true)
      await followUnfollowFetch(id)
      setUserFollow(prevState => !prevState)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!loading
        ? (
          <button
            onClick={handleFollowUnfollowUser}
            className='dark:bg-hoverDark bg-hoverLight hover:bg-gray-400 p-2 rounded dark:hover:bg-stone-900 md:w-48  w-24'
          >{userFollow ? 'No seguir' : 'Seguir'}
          </button>
          )
        : <div className='flex items-center justify-center'>
          <Spinner size='40' />
        </div>}

    </>
  )
}

export default FollowButton
