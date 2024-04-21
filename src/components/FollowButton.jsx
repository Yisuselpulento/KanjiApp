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
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const textButton = userFollow ? 'Siguiendo' : 'Seguir'

  return (
    <>

      <button
        disabled={loading}
        onClick={handleFollowUnfollowUser}
        className={`dark:bg-hoverDark bg-hoverLight hover:bg-gray-400 p-2 rounded dark:hover:bg-stone-900 md:w-48 w-24 ${userFollow ? 'border border-green-400' : ''}`}
      >{!loading
        ? textButton
        : <div className='flex items-center justify-center'>
          <Spinner size='23' />
          </div>}
      </button>

    </>
  )
}

export default FollowButton
