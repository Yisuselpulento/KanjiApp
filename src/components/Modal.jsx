import { IoClose } from 'react-icons/io5'

const Modal = ({ isOpen, onClose, children }) => {
  const closeModal = () => {
    onClose()
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      {isOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen '>
            <div className='fixed inset-0 bg-gray-700 opacity-75 ' />
            <div className='relative  overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full  w-screen px-2 '>
              <div className='absolute top-4 right-4 md:p-5 md:top-0 md:right-0 '>
                <button
                  onClick={closeModal}
                  className=' hover:text-gray-500 focus:outline-none text-gray-400'
                >
                  <IoClose className='md:w-7 md:h-7 w-6 h-6 ' />
                </button>
              </div>
              <div
                onClick={stopPropagation}
              >
                {children}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
