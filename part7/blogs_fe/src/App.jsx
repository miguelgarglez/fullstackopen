import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(orderBlogs(blogs))
    })
  }, [])

  const orderBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'Wrong credentials',
          seconds: 5,
        })
      )
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      const populatedBlog = await blogService.getOne(newBlog.id)
      setBlogs(blogs.concat(populatedBlog))
      console.log('populatedBlog:', populatedBlog)

      dispatch(
        setNotification({
          message: `A new blog ${populatedBlog.title} by ${populatedBlog.author} added`,
          seconds: 5,
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'Error creating blog',
          seconds: 5,
        })
      )
    }
  }

  const updateBlog = async (id, update) => {
    const updatedBlog = await blogService.update(id, update)
    if (updatedBlog) {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(
          setNotification({
            message: `Blog ${blog.title} by ${blog.author} removed`,
            seconds: 5,
          })
        )
      }
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'Error removing blog',
          seconds: 5,
        })
      )
    }
  }

  const loginForm = () => (
    <form id="login-form" onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogForm = () => {
    return <BlogForm createBlog={addBlog} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged-in{' '}
            <button id="logout" onClick={handleLogout}>
              Logout
            </button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            {blogForm()}
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              currentLoggedInUser={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
