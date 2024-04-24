import { useState } from 'react'
import { toast } from 'react-toastify'
import { createReplies } from '../services/postsFetch'
import useAuth from '../hooks/useAuth'
import Alert from './Alert'

const FormReplies = ({ postId, closeModal }) => {
  const [postText, setPostText] = useState('')
  const [alert, setAlert] = useState({})
  const [loading, setLoading] = useState(true)

  const { setStateNumberReplies, setRepliesState } = useAuth()

  const handlePostReplie = async (e) => {
    e.preventDefault()

    if (!postText.trim()) {
      setAlert({
        msg: 'No hay nada escrito',
        error: true
      })
      return
    }

    try {
      const replieInfo = {
        text: postText
      }
      const newReplie = await createReplies(postId, replieInfo)
      setRepliesState(prevReplies => [...prevReplies, newReplie.newReply])
      setStateNumberReplies(prev => prev + 1)
      toast.success('Comentario Creado Correctamente')
      closeModal()
      setPostText('')
      setAlert({
      })
    } catch (error) {
      setLoading(false)
      toast.error('Ha ocurrido un error')
      console.error('Error al crear el post:', error)
    }
  }

  const handleTextChange = (e) => {
    setPostText(e.target.value)
  }
  return (
    <form
      onSubmit={handlePostReplie}
      className='bg-postColor md:px-8 px-4 pt-14 md:pb-8 pb-4 rounded flex flex-col md:gap-10 gap-6 '
    >
      <textarea
        className='p-1 rounded border border-[#64748b] bg-postColor w-full  '
        onChange={handleTextChange}
      />
      <div className='flex justify-end gap-5'>
        {alert.msg && <Alert alert={alert} />}
        <input
          disabled={!loading}
          type='submit'
          className=' bg-blue-300 border border-blue-400 hover:bg-blue-400 text-gray-700 font-bold md:px-4 px-2 md:py-2 py-1 rounded md:w-[100px] w-[70px] cursor-pointer text-sm md:text-lg'
          value='Post'
        />
      </div>
    </form>
  )
}

export default FormReplies
