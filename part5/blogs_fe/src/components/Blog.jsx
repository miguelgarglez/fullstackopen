import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Blog = forwardRef(
  ({ blog, updateBlog, deleteBlog, currentLoggedInUser }, refs) => {
    const [visibleDetails, setVisibleDetails] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

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

    useImperativeHandle(refs, () => {
      return {
        setLikes,
      }
    })

    const handleLike = async () => {
      await updateBlog(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes + 1,
        user: blog.user.id,
      })
    }

    const handleRemove = async () => {
      await deleteBlog(blog)
    }

    return (
      <div style={blogStyle}>
        <div>
          <span id="blogHeader">
            {blog.title} - {blog.author}{' '}
            <button id="toggleButton" onClick={toggleVisibility}>
              {visibleDetails ? 'hide' : 'view'}
            </button>
          </span>
          <div
            style={{ display: visibleDetails ? '' : 'none' }}
            id="blogDetails"
          >
            <div>{blog.url}</div>
            <div>
              likes: {likes} <button onClick={handleLike}>like</button>
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
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentLoggedInUser: PropTypes.object.isRequired,
}

export default Blog
