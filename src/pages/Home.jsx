import React from 'react'
import CardPosts from '../components/CardPosts'
import users from '../data/users.json'
import postsUsers from '../data/posts.json'

const Home = () => {
  const { posts } = postsUsers
  const { usuarios } = users

  return (
    <div>

      {posts.map(post => {
        const user = usuarios.find(user => user.id === post.postedBy)

        return (
          <CardPosts
            key={post.postId}
            profilePic={user.profilePic}
            user={user.username}
            userId={user.id}
            post={post}
          />
        )
      })}

    </div>
  )
}

export default Home
