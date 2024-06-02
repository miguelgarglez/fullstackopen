import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogTile = ({ blog }) => {
  return (
    <>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td>{blog.author}</td>
    </>
  )
}

const BlogList = () => {
  const blogs = useSelector((state) => {
    const blogs = state.blogs
    return [...blogs].sort((a, b) => b.likes - a.likes)
  })

  return (
    <div>
      <Table hover bordered>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <BlogTile blog={blog} />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

BlogTile.propTypes = {
  blog: PropTypes.object.isRequired,
}

BlogTile.displayName = 'Blog'

export default BlogList
