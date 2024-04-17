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

export {
  fetchPost,
  FetchGetUserPosts,
  fetchPostPage

}
