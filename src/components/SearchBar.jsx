import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUserbyUserName } from '../services/usersFetch'
import useAuth from '../hooks/useAuth'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

  const { auth } = useAuth()

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        const results = await fetchUserbyUserName(searchTerm)
        setSearchResults(results || [])
      } else {
        setSearchResults([])
      }
    }

    fetchSearchResults()
  }, [searchTerm])

  const handleUserClick = (userId) => {
    setSearchTerm('')
    setSearchResults([])
    if (userId === auth._id) {
      navigate('/profile')
    } else {
      navigate(`user/${userId}`)
    }
  }

  return (
    <div className='flex items-center'>
      <div className='flex gap-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=' w-[180px] md:w-[400px] px-3 py-2 text-primary bg-gray-200 dark:bg-white border rounded-full focus:border-blue-700 focus:ring-blue-700 focus:outline-none focus:ring focus:ring-opacity-40 h-[35px] text-gray-700'
          placeholder='Buscar...'
        />
        {searchResults?.length > 0 && (
          <div className='absolute mt-10  md:w-[400px] font-bold border-gray-200 dark:bg-bgDark dark:text-gray-200 border rounded-md shadow-md bg-white w-full '>
            {searchResults.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className='block cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200 dark:text-gray-300 '
              >
                <div className='flex gap-4 items-center border-b dark:border-gray-900 p-3'>
                  <img
                    className='md:w-12 md:h-12 w-8 h-8 rounded-full object-cover'
                    src={user.profilePic}
                  />
                  <p>{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
