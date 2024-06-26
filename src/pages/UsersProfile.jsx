import { FaInstagram } from 'react-icons/fa'
import CardPosts from '../components/CardPosts'
import { IoChatbubbleEllipsesOutline, IoEllipsisHorizontalCircleOutline } from 'react-icons/io5'
import Lightbox from '../components/Lightbox'
import { NavLink, useParams } from 'react-router-dom'
import { getUser } from '../services/usersFetch'
import { useState, useEffect } from 'react'
import { FetchGetUserPosts } from '../services/postsFetch'
import FollowButton from '../components/FollowButton'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'

const UsersProfile = () => {
  const [user, setUser] = useState({})
  const [postsUser, setPostsUser] = useState([])
  const [loading, setLoading] = useState(true)

  const { auth } = useAuth()

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
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    )
  }

  const { bio, country, followers, sexo, following, profilePic, username, age } = user

  const userFollow = followers?.some(follower => follower === auth._id)

  const seguidores = followers?.length === 1 ? `${followers?.length} Seguidor` : `${followers?.length} Seguidores`

  const seguidos = following?.length === 1 ? `${following?.length} Seguido` : `${following?.length} Seguidos`

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-16'>
          <div className='flex flex-col gap-3'>
            <p className='font-bold md:text-4xl text-xl'>{username}</p>
            <div className='flex gap-5 items-center'>
              <p className='dark:bg-hoverDark p-1 rounded-full text-neutral-500'>kanjiapp.net</p>
            </div>
          </div>
          <div className='flex flex-col gap-5 md:max-w-[500px] max-w-[200px]'>
            <p className='h-[60px]'>{bio || 'Usuario de KanjiApp'}</p>
            <div className='flex  gap-4'>
              <div>
                <p>Edad :</p>
                <p>Pais :</p>
                <p>Sexo :</p>

              </div>
              <div>
                <p>{age}</p>
                <p>{country}</p>
                <p>{sexo}</p>

              </div>
            </div>
            <FollowButton
              id={id}
              initialUserFollow={userFollow}
            />
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
        <div className='flex gap-5'>
          <p>{seguidores} </p>
          <p>{seguidos} </p>
        </div>
        <div className='flex gap-5'>
          <FaInstagram className='md:w-9 md:h-9 w-7 h-7' />
          <NavLink
            className={({ isActive }) =>
              isActive ? 'dark:hover:bg-stone-800 hover:bg-gray-300 rounded-full md:p-2 p-1 bg-hoverLight dark:bg-hoverDark' : 'dark:hover:bg-stone-800 hover:bg-gray-300  md:p-2 p-1 rounded-full '}
            to={`/chat/${id}`}
          >

            <IoChatbubbleEllipsesOutline className='md:w-7 md:h-7 w-6 h-6 ' />
          </NavLink>
        </div>
      </div>
      <div className='border-b text-center p-4'>
        <p>Publicaciones</p>
      </div>
      <div>
        {postsUser?.length
          ? postsUser.map(post => (
            <CardPosts
              key={post._id}
              post={post}
            />
          ))

          : <div className='flex items-center justify-center p-10'>
            <p className='font-bold'>No hay publicaciones</p>
          </div>}

      </div>
    </div>
  )
}

export default UsersProfile
