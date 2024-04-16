import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

function Lightbox ({ photo, alt, style }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleLightbox = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <img
        src={photo}
        alt={alt}
        onClick={toggleLightbox}
        className={style}
      />
      {isOpen && (
        <div
          onClick={toggleLightbox}
          className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75 '
        >
          <button onClick={toggleLightbox} className='hover:bg-neutral-900 absolute top-0 right-0 m-1 md:m-5 p-1 text-white bg-neutral-800 rounded-full'>
            <IoClose className='md:w-7 md:h-7 w-5 h-5 ' />
          </button>
          <img src={photo} alt={alt} className='max-w-full max-h-full' />
        </div>
      )}
    </>
  )
}

export default Lightbox
