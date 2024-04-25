import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { SiLeagueoflegends } from 'react-icons/si'

const Footer = () => {
  return (
    <footer className='flex items-center justify-center dark:bg-bgDark border-t border-gray-100 h-[200px] bg-gray-200 '>

      <div className='flex flex-col items-center gap-2 text-stone-500 '>
        <p className='p-3'> Derechos de autor MonssterCore ©</p>
        <p>Sigueme en mis redes Sociales</p>
        <div className='flex flex-col gap-3 items-center'>
          <div className='flex gap-5'>
            <a>
              <FaFacebook className='md:w-7 md:h-7 w-5 h-5' />
            </a>
            <a>

              <FaInstagram className='md:w-7 md:h-7 w-5 h-5' />
            </a>
            <a>

              <SiLeagueoflegends className='md:w-7 md:h-7 w-5 h-5' />
            </a>

          </div>
          <div className='flex gap-4 '>
            <FaTelegram className='md:w-7 md:h-7 w-5 h-5' />
            <FaWhatsapp className='md:w-7 md:h-7 w-5 h-5' />

          </div>
          <p>+56975259414</p>

        </div>
      </div>
    </footer>
  )
}

export default Footer
