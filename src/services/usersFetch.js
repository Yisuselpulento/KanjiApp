import clienteAxios from '../config/clienteAxios'

const getUser = async (id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios(`/users/profile/${id}`, config)
    return data
  } catch (error) {
    console.log(error)
  }
}

const followUnfollowFetch = async (id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.post(`/users/follow/${id}`, {}, config)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

const updateUser = async (formData, id) => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await clienteAxios.put(`/users/update/${id}`, formData, config)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export {
  getUser,
  followUnfollowFetch,
  updateUser
}
