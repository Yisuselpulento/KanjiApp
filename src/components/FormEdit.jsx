import React from 'react'

const FormEdit = () => {
  return (
    <div className='flex justify-center  items-center h-full  p-1'>
      <div className='dark:bg-stone-900 bg-gray-200 w-full rounded-lg p-6 md:p-14 md:w-[500px] flex flex-col gap-4 dark:text-indigo-100 '>
        <div>
          <p className='md:text-3xl text-xl font-bold'>Edita tu info</p>
        </div>
        <div className='flex gap-5 items-center justify-between '>
          <img
            className='rounded-full md:w-28 md:h-28 w-20 h-20 object-cover'
            src='/ssssssss.jpg'
          />
          <button className='dark:bg-neutral-700 bg-gray-300 hover:bg-gray-400 dark:hover:bg-neutral-800 md:w-60 w-32 h-10 rounded'>
            Cambiar foto
          </button>
        </div>
        <form
          className='  flex flex-col md:gap-8 gap-5 shadow-lg  '

        >
          <div className='dark:text-indigo-100 text-gray-500'>
            <label className='block pb-2'>Usuario</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='text'
              name='usuario'
              placeholder='Usuario'

            />
          </div>
          <div>
            <label className='block pb-2'>Password</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='password'
              name='password'
              placeholder='Password'

            />
          </div>
          <div>
            <label className='block pb-2'>Repetir Password</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='password'
              name='repeatPassword'
              placeholder='Password'

            />
          </div>
          <div>
            <label className='block pb-2'>Email</label>
            <input
              className='dark:bg-stone-900 dark:text-fontDark text-fontLight p-2 w-full border border-hoverDark'
              type='email'
              name='email'
              placeholder='Email'
            />
          </div>
          <div className='flex gap-4'>
            <button
              className='bg-red-400 hover:bg-red-500 rounded uppercase md:p-3 p-1 w-full font-bold md:text-lg text-white'
            >cancelar
            </button>
            <button
              className='bg-green-500 hover:bg-green-600 rounded uppercase md:p-3 p-1 w-full font-bold md:text-lg text-white'
              type='submit'
            >aceptar
            </button>
          </div>

        </form>

      </div>

    </div>
  )
}

export default FormEdit
