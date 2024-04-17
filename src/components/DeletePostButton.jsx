import { BsTrash3Fill } from 'react-icons/bs'
import { deletePost } from '../services/postsFetch' // Importa la función deletePost

const DeletePostButton = ({ postId }) => {
  const handleDelete = async () => {
    try {
      await deletePost(postId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button onClick={handleDelete}>
      <BsTrash3Fill className='md:w-7 md:h-7 w-7 h-5 p-1 hover:dark:bg-hoverDark hover:bg-hoverLight rounded-full' />
    </button>
  )
}

export default DeletePostButton
