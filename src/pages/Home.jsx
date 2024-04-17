import CardPosts from '../components/CardPosts'
import { useEffect, useState } from 'react'
import { fetchPost } from '../services/postsFetch'

const Home = () => {
  const [cargando, setCargando] = useState(true)
  const [feedPosts, setFeedPosts] = useState([])

  useEffect(() => {
    const getFeedPost = async () => {
      try {
        const data = await fetchPost()
        setFeedPosts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setCargando(false)
      }
    }
    getFeedPost()
  }, [])

  return (
    <div>

      {feedPosts.map(post => {
        return (
          <CardPosts
            key={post._id}
            post={post}
          />
        )
      })}

    </div>
  )
}

export default Home
