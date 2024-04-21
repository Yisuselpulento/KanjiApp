import clienteAxios from '../config/clienteAxios'

const fetchPostFeed = async () => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios('/posts/feed', config)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching posts and users')
  }
}

const FetchGetUserPosts = async (id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios(`/posts/user/${id}`, config)
    return data
  } catch (error) {
    console.log(error)
  }
}

const fetchPostPage = async (id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios(`/posts/${id}`, config)
    return data
  } catch (error) {
    console.log(error)
  }
}

const LikeUnlikePost = async (id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.put(`/posts/like/${id}`, {}, config)
    return data
  } catch (error) {
    console.log(error)
  }
}

const createPost = async (form) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.post('/posts/create', form, config)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

const deletePost = async (id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.delete(`/posts/${id}`, config)

    return data
  } catch (error) {
    console.log(error)
  }
}

const createReplies = async (id, replieInfo) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.post(`/posts/create/${id}`, replieInfo, config)

    return data
  } catch (error) {
    console.log(error)
  }
}

const deleteReplie = async (postId, id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.delete(`/posts/${postId}/${id}`, config)
    return data
  } catch (error) {
    console.log(error)
  }
}

export {
  FetchGetUserPosts,
  fetchPostPage,
  LikeUnlikePost,
  createPost,
  deletePost,
  fetchPostFeed,
  createReplies,
  deleteReplie

}
