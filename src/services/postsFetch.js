import clienteAxios from '../config/clienteAxios'

const fetchPost = async () => {
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

export {
  fetchPost,
  FetchGetUserPosts,
  fetchPostPage,
  LikeUnlikePost,
  createPost,
  deletePost

}
