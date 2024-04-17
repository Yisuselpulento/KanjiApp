import { followUnfollowFetch } from '../services/usersFetch'
import { useState } from 'react'

const FollowButton = ({ id, initialUserFollow }) => {
  const [userFollow, setUserFollow] = useState(initialUserFollow)

  const handleFollowUnfollowUser = async () => {
    try {
      await followUnfollowFetch(id)
      setUserFollow(prevState => !prevState)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button
        onClick={handleFollowUnfollowUser}
        className='dark:bg-hoverDark bg-hoverLight hover:bg-gray-400 p-2 rounded dark:hover:bg-stone-900 md:w-48  w-24'
      >{!userFollow ? 'No seguir' : 'Seguir'}
      </button>
    </>
  )
}

export default FollowButton
