import { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const BlogTile = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span id="blogHeader">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </span>
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
        <BlogTile key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

BlogTile.propTypes = {
  blog: PropTypes.object.isRequired,
}

BlogTile.displayName = 'Blog'

export default BlogList
