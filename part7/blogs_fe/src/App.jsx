import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { clearUser, initializeUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import { Route, Routes } from 'react-router-dom'
import User from './components/User'
import Menu from './components/Menu'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

  const user = useSelector((state) => state.user)

  return (
    <div>
      {user && (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F0F0F0',
              padding: '10px',
            }}
          >
            <Menu />
            {user.name} logged-in{' '}
            <button id="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <h2>blog app</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            {<BlogForm />}
          </Togglable>

          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/create" element={<BlogForm />} />
          </Routes>
          <Footer />
        </div>
      )}
      <Notification />
      {!user && (
        <div>
          <h2>Login to blog app</h2>
          <LoginForm />
        </div>
      )}
    </div>
  )
}

const Footer = () => (
  <div>
    Blog app for <a href="https://fullstackopen.com/">Full Stack Open</a>. See{' '}
    <a href="https://github.com/miguelgarglez/fullstackopen/part7/blogs_fe">
      GitHub Repository
    </a>{' '}
    for the source code.
  </div>
)

export default App
