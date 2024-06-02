import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const currentLoggedInUser = window.localStorage.getItem('loggedBlogappUser')
  const dispatch = useDispatch()
  const match = useMatch('/blogs/:id')

  const blogs = useSelector((state) => state.blogs)
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  if (!blog) {
    return null
  }
  const handleLike = async () => {
    dispatch(likeBlog(blog.id, blog))
    dispatch(
      setNotification({
        message: `You liked '${blog.title}'`,
        seconds: 5,
      })
    )
  }

  const handleRemove = async () => {
    dispatch(deleteBlog(blog))
    dispatch(
      setNotification({
        message: `You removed '${blog.title}'`,
        seconds: 5,
      })
    )
  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes: {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      {blog.user ? <div>added by {blog.user.name}</div> : null}
      {blog.user &&
      currentLoggedInUser &&
      blog.user.id === currentLoggedInUser.id ? (
        <button onClick={handleRemove}>remove</button>
      ) : null}
    </div>
  )
}

export default Blog
