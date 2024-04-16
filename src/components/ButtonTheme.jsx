import React from 'react'
import useTheme from '../hooks/useTheme'

const ButtonTheme = () => {
  const { handleChangeMode, theme } = useTheme()
  return (
    <button
      onClick={handleChangeMode}
      className='dark:hover:bg-hoverDark hover:bg-hoverLight  md:p-2 p-1 rounded-full'
    >
      <img
        className='md:w-[30px] w-5'
        src={`${theme === 'light' ? '/logoKanjiapp.webp' : '/logoKanjiappLight.webp'} `} alt='logo principal de la pagina'
      />
    </button>
  )
}

export default ButtonTheme
