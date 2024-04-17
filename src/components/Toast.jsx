import { useState, useEffect } from 'react'

const Toast = ({ msg }) => {
  const [showToast, setShowToast] = useState(true)

  const handleClose = () => {
    setShowToast(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showToast && (
        <div className='fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 border border-green-600 text-sm text-white rounded-xl shadow-lg font-bold animate-toast'>
          <div className='flex px-5 py-3'>
            <div className='ml-auto flex items-center gap-2'>
              {msg}
              <button
                type='button'
                className='inline-flex justify-center items-center w-8 h-8 rounded-full text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100'
                onClick={handleClose}
              >
                <span className='sr-only'>Close</span>
                <svg
                  className='w-4 h-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M18 6 6 18' />
                  <path d='m6 6 12 12' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Toast
