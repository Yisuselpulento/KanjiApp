import { FaInstagram } from 'react-icons/fa'
import CardPosts from '../components/CardPosts'
import { IoEllipsisHorizontalCircleOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import FormEdit from '../components/FormEdit'
import Lightbox from '../components/Lightbox'
import useAuth from '../hooks/useAuth'
import { FetchGetUserPosts } from '../services/postsFetch'
import Spinner from '../components/Spinner'

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const { auth } = useAuth()

  useEffect(() => {
    const getPostsProfile = async () => {
      try {
        const data = await FetchGetUserPosts(auth._id)
        setPosts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getPostsProfile()
  }, [posts])

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const { username, bio, age, country, profilePic, sexo, followers } = auth

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-16'>
          <div className='flex flex-col gap-3'>
            <p className='font-bold md:text-4xl text-xl'>{username}</p>
            <div className='flex gap-5 items-center'>
              <p>zuck</p>
              <p className='dark:bg-hoverDark p-1 rounded-full text-neutral-500'>kanjiapp.net</p>
            </div>
          </div>
          <div className='flex flex-col gap-5 md:max-w-[500px] max-w-[200px]'>
            <p>  Threads is way better then bird fdsfds.</p>
            <button
              onClick={openModal}
              className='dark:bg-hoverDark bg-hoverLight hover:bg-gray-400 p-2 rounded dark:hover:bg-stone-900 md:w-48  w-24'
            >Editar Perfil
            </button>
          </div>
        </div>
        <div>
          <Lightbox
            style='w-24 h-24 rounded-full object-cover cursor-pointer'
            photo='/ssssssss.jpg' alt='post imagen de usuario'
          />

        </div>
      </div>
      <div className='flex justify-between'>
        <div>
          <p>{followers?.length} followers</p>
        </div>
        <div className='flex gap-5'>
          <FaInstagram className='md:w-9 md:h-9 w-7 h-7' />
          <IoEllipsisHorizontalCircleOutline className='md:w-9 md:h-9 w-7 h-7' />
        </div>
      </div>
      <div className='border-b text-center p-4'>
        <p>Publicaciones</p>
      </div>
      <div>
        {posts.length
          ? posts?.map(post =>
            <CardPosts
              key={post._id}
              post={post}
            />
          )
          : <div className='flex items-center justify-center h-screen'>
            <p className='font-bold'>No tienes ningun post aun</p>
            </div>}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <FormEdit />
      </Modal>
    </div>
  )
}

export default Profile
