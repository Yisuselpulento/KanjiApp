import { FaRegComment } from 'react-icons/fa'

const ReplieButton = ({ openModal }) => {
  return (
    <button><FaRegComment
      onClick={openModal}
      className='md:w-6 md:h-6 w-5 h-5'
            />
    </button>
  )
}

export default ReplieButton
