import CardPosts from '../components/CardPosts'
import { useEffect, useState } from 'react'
import { fetchPost } from '../services/postsFetch'
import Spinner from '../components/Spinner'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [feedPosts, setFeedPosts] = useState([])

  useEffect(() => {
    const getFeedPost = async () => {
      try {
        const data = await fetchPost()
        setFeedPosts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getFeedPost()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      {feedPosts.length
        ? feedPosts.map(post => {
          return (
            <CardPosts
              key={post._id}
              post={post}
            />
          )
        })
        : (<div className='flex items-center justify-center h-screen'>
          <p className='font-bold'>No sigues a nadie aun</p>
           </div>)}

    </div>
  )
}

export default Home
