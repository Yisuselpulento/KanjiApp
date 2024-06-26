import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LayoutLogin from './layouts/LayoutLogin'
import SignUp from './pages/SignUp'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import UsersProfile from './pages/UsersProfile'
import Profile from './pages/Profile'
import { ThemeProvider } from './context/ThemeProvider'
import PostsPage from './pages/PostsPage'
import { AuthUserProvider } from './context/AuthUserProvider'
import NotFound from './pages/NotFound'
import Chat from './pages/Chat'
import ChatUser from './pages/ChatUser'

export default function App () {
  return (
    <BrowserRouter>
      <AuthUserProvider>
        <ThemeProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='profile' element={<Profile />} />
              <Route path='post/:postId' element={<PostsPage />} />
              <Route path='user/:id' element={<UsersProfile />} />
              <Route path='chat' element={<Chat />} />
              <Route path='chat/:idUser' element={<ChatUser />} />
            </Route>

            <Route path='/login' element={<LayoutLogin />}>
              <Route index element={<Login />} />
              <Route path='signup' element={<SignUp />} />
            </Route>

            <Route path='/signup' element={<LayoutLogin />}>
              <Route index element={<SignUp />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </AuthUserProvider>
    </BrowserRouter>
  )
}
