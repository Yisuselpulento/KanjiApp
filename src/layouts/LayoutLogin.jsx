import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ButtonTheme from '../components/ButtonTheme'

const LayoutLogin = () => {
  return (
    <div className='md:w-[1000px]  p-4'>
      <header>
        <nav className='flex justify-between items-center text-center'>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'dark:hover:bg-stone-800 hover:bg-gray-300 w-24 md:p-2 p-1 rounded bg-hoverLight dark:bg-hoverDark' : 'dark:hover:bg-stone-800 hover:bg-gray-300  md:p-2 p-1 rounded w-24'}
            to='/login'
          >Inicia
          </NavLink>
          <ButtonTheme />
          <NavLink
            className={({ isActive }) =>
              isActive ? 'dark:hover:bg-stone-800 hover:bg-gray-300 w-24  md:p-2 p-1 rounded bg-hoverLight dark:bg-hoverDark' : 'dark:hover:bg-stone-800 hover:bg-gray-300 w-24 md:p-2 p-1 rounded'}
            to='/signup'
          >Registrate
          </NavLink>
        </nav>
      </header>
      <main className='min-h-screen w-full items-center flex justify-center'>
        <Outlet />
      </main>
      <footer className='flex items-center justify-center dark:bg-bgDark border-t border-gray-100 h-[100px] bg-gray-200'>
        FOOTER
      </footer>
    </div>
  )
}

export default LayoutLogin
