import { FaInstagram } from 'react-icons/fa'
import CardPosts from '../components/CardPosts'
import { IoEllipsisHorizontalCircleOutline } from 'react-icons/io5'
import Lightbox from '../components/Lightbox'
import { useParams } from 'react-router-dom'
import { getUser } from '../services/usersFetch'
import { useState, useEffect } from 'react'
import { FetchGetUserPosts } from '../services/postsFetch'

const UsersProfile = () => {
  const [user, setUser] = useState({})
  const [postsUser, setPostsUser] = useState([])
  const [cargando, setCargando] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, userPostsData] = await Promise.all([
          getUser(id),
          FetchGetUserPosts(id)
        ])

        setUser(userData)
        setPostsUser(userPostsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setCargando(false)
      }
    }
    fetchData()
  }, [id])

  const { bio, country, followers, following, profilePic, username, age } = user

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
            <p>{bio}</p>
            <button className='dark:bg-hoverDark bg-hoverLight hover:bg-gray-400 p-2 rounded dark:hover:bg-stone-900 md:w-48  w-24'>Seguir</button>
          </div>
        </div>
        <div>
          <Lightbox
            style='w-24 h-24 rounded-full object-cover cursor-pointer'
            photo={profilePic} alt='post imagen de usuario'
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
        {postsUser.map(post => (
          <CardPosts
            key={post._id}
            post={post}
          />
        ))}

      </div>
    </div>
  )
}

export default UsersProfile
