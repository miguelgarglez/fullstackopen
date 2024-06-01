import { useState, useEffect, useRef } from 'react'
import Blog from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { clearUser, initializeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'

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
      <h2>blogs</h2>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <p>
            {user.name} logged-in{' '}
            <button id="logout" onClick={handleLogout}>
              Logout
            </button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            {<BlogForm />}
          </Togglable>

          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
