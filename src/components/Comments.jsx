import React from 'react'
import { Link } from 'react-router-dom'

const Comments = () => {
  return (
    <div className='flex gap-5 py-6 border-t border-neutral-800'>
      <Link
        to='/user/satoru'
      >
        <img
          className='w-16 h-16 rounded-full'
          src='/picture.webp' alt='imagen de usuario'
        />
      </Link>
      <div className='flex flex-col gap-3'>
        <Link
          to='/user/satoru'
          className='text-xl font-bold'
        >Nombre de usuario
        </Link>
        <p>Lorem ipsum dolor, sit amet consect</p>
      </div>
    </div>
  )
}

export default Comments
