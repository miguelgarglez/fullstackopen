import { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [visibleDetails, setVisibleDetails] = useState(false)

  const currentLoggedInUser = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisibleDetails(!visibleDetails)
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
    <div className="blog" style={blogStyle}>
      <div>
        <span id="blogHeader">
          {blog.title} - {blog.author}{' '}
          <button id="toggleButton" onClick={toggleVisibility}>
            {visibleDetails ? 'hide' : 'view'}
          </button>
        </span>
        <div style={{ display: visibleDetails ? '' : 'none' }} id="blogDetails">
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          {blog.user ? <div>{blog.user.name}</div> : null}
          {blog.user &&
          currentLoggedInUser &&
          blog.user.id === currentLoggedInUser.id ? (
            <button onClick={handleRemove}>remove</button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

const BlogList = () => {
  const blogs = useSelector((state) => {
    const blogs = state.blogs
    return [...blogs].sort((a, b) => b.likes - a.likes)
  })

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

Blog.displayName = 'Blog'

export default BlogList
