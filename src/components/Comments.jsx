import { Link } from 'react-router-dom'
import users from '../data/users.json'

const Comments = ({ comment }) => {
  const { text, userId } = comment

  const user = users.usuarios.find(user => user.id === userId)

  return (
    <div className='flex gap-5 py-6 border-t border-neutral-800'>
      <Link
        to={`/user/${user.id}`}
      >
        <img
          className='w-16 h-16 rounded-full'
          src={user.profilePic} alt='imagen de usuario'
        />
      </Link>
      <div className='flex flex-col gap-3'>
        <Link
          to={`/user/${user.id}`}
          className='text-xl font-bold'
        >{user.username}
        </Link>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Comments
