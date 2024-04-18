import { NavLink, Navigate, Outlet } from 'react-router-dom'
import ButtonTheme from '../components/ButtonTheme'
import { FaHome } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { LuUserCircle2 } from 'react-icons/lu'
import { IoIosAdd } from 'react-icons/io'
import { useState } from 'react'
import Modal from '../components/Modal'
import useAuth from '../hooks/useAuth'
import FormPost from '../components/FormPost'

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { auth, setAuth } = useAuth()

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSesionClose = () => {
    setAuth({})
    window.localStorage.removeItem('token')
  }

  return (
    <div className='md:w-[1000px]  md:p-4 p-2 relative'>
      {auth?._id
        ? <>
          <header>
            <nav className='flex justify-between items-center text-center'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'dark:hover:bg-stone-800 hover:bg-gray-300 rounded-full md:p-3 p-2 bg-hoverLight dark:bg-hoverDark' : 'dark:hover:bg-stone-800 hover:bg-gray-300  md:p-3 p-2 rounded-full '}
                to='/'
              ><FaHome className='md:w-6 md:h-6 w-5 h-5' />
              </NavLink>
              <ButtonTheme />
              <div className='flex gap-3'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'dark:hover:bg-stone-800 hover:bg-gray-300 rounded-full md:p-3 p-2 bg-hoverLight dark:bg-hoverDark' : 'dark:hover:bg-stone-800 hover:bg-gray-300  md:p-3 p-2 rounded-full '}
                  to='/profile'
                ><LuUserCircle2 className='md:w-6 md:h-6 w-5 h-5' />
                </NavLink>
                <button
                  onClick={handleSesionClose}
                  className='dark:hover:bg-stone-800 hover:bg-gray-300 rounded-full md:p-3 p-2 '
                ><MdLogout className='md:w-6 md:h-6 w-5 h-5' />
                </button>
              </div>
            </nav>
          </header>
          <main className='min-h-screen md:mt-16 mt-8 '>
            <Outlet />
          </main>
        </>
        : <Navigate to='/login' />}

      <footer className='flex items-center justify-center dark:bg-bgDark border-t border-gray-100 h-[100px] bg-gray-200'>
        FOOTER
      </footer>
      <button
        onClick={openModal}
        className='dark:bg-stone-800 dark:hover:bg-stone-900 bg-gray-300 hover:bg-gray-400 md:p-2 rounded fixed md:bottom-4 md:right-4 bottom-2 right-2'
      >
        <IoIosAdd className='font-bold w-8 h-8' />
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <FormPost

          closeModal={closeModal}
        />
      </Modal>

    </div>
  )
}

export default Layout
